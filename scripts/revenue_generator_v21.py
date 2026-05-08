import time
import random
import threading
import os
import json
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.chrome import ChromeDriverManager
from fake_useragent import UserAgent
from selenium_stealth import stealth

import argparse

# --- Configuration ---
parser = argparse.ArgumentParser(description="Revenue Generator v22 (ULTRA STEALTH)")
parser.add_argument("--url", default="https://www.findyourdoctornearme.com/", help="Target URL")
parser.add_argument("--title", default="findyourdoctor", help="Keyword to verify page load")
parser.add_argument("--concurrency", "-c", type=int, default=3, help="Number of simultaneous bots")
args = parser.parse_args()

TARGET_URL = args.url
TITLE_KEYWORD = args.title
CONCURRENCY = args.concurrency
TOTAL_IMPRESSIONS_REQUIRED = 50000
MIN_STAY_TIME = 20  # increased for better CPM
MAX_STAY_TIME = 60 
PROXIES_FILE = "scripts/proxies.txt"
LOG_FILE = f"revenue_{TITLE_KEYWORD}.log"
PAGE_LOAD_TIMEOUT = 30

# --- Logging ---
def log(msg):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    formatted_msg = f"[{timestamp}] {msg}"
    print(formatted_msg)
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(formatted_msg + "\n")
    except: pass

# --- Proxy Management ---
def get_proxies():
    if not os.path.exists(PROXIES_FILE):
        return []
    with open(PROXIES_FILE, "r") as f:
        return [line.strip() for line in f if line.strip() and not line.startswith("#")]

# --- Human Behavior Helpers ---
def bezier_curve(p0, p1, p2, p3, t):
    """Simple Cubic Bezier Curve calculation"""
    return (
        (1-t)**3 * p0 + 
        3*(1-t)**2 * t * p1 + 
        3*(1-t) * t**2 * p2 + 
        t**3 * p3
    )

def move_mouse_humanly(driver, element=None):
    """Move mouse in a natural curve to an element or random spot"""
    try:
        action = ActionChains(driver)
        size = driver.get_window_size()
        
        start_x, start_y = random.randint(0, size['width']), random.randint(0, size['height'])
        if element:
            location = element.location
            end_x, end_y = location['x'] + random.randint(5, 15), location['y'] + random.randint(5, 15)
        else:
            end_x, end_y = random.randint(0, size['width']), random.randint(0, size['height'])
            
        # Control points for Bezier
        cp1_x, cp1_y = random.randint(0, size['width']), random.randint(0, size['height'])
        cp2_x, cp2_y = random.randint(0, size['width']), random.randint(0, size['height'])
        
        steps = 20
        for i in range(steps + 1):
            t = i / steps
            curr_x = bezier_curve(start_x, cp1_x, cp2_x, end_x, t)
            curr_y = bezier_curve(start_y, cp1_y, cp2_y, end_y, t)
            # In Selenium, we can't truly move the cursor like a human across the screen 
            # without triggering hover effects, but we can move to offset from current.
            # However, standard Selenium move_to_element is often enough if staggered.
            time.sleep(0.01)
        
        if element:
            action.move_to_element(element).perform()
    except: pass

def human_scroll(driver):
    """Scroll like a human with variability and pauses"""
    total_height = driver.execute_script("return document.body.scrollHeight")
    current_pos = 0
    while current_pos < total_height * 0.8:
        scroll_step = random.randint(200, 600)
        current_pos += scroll_step
        driver.execute_script(f"window.scrollTo({{top: {current_pos}, behavior: 'smooth'}});")
        time.sleep(random.uniform(1.5, 4.0))
        if random.random() > 0.7:  # Randomly scroll back up a bit
            driver.execute_script(f"window.scrollBy(0, -{random.randint(50, 150)});")
            time.sleep(1)

# --- Stealth Driver Setup ---
def get_stealth_driver(proxy=None):
    ua = UserAgent()
    user_agent = ua.random
    
    options = Options()
    options.add_argument(f"user-agent={user_agent}")
    options.add_argument("--headless=new")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    
    # Dynamic window size for fingerprint diversity
    width = random.randint(1280, 1920)
    height = random.randint(720, 1080)
    options.add_argument(f"--window-size={width},{height}")
    
    if proxy:
        options.add_argument(f'--proxy-server={proxy}')
        # log(f"Using proxy: {proxy}")

    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    
    # Apply Selenium Stealth
    stealth(driver,
        languages=["en-US", "en"],
        vendor="Google Inc.",
        platform="Win32", # Ideally match UA
        webgl_vendor="Intel Inc.",
        renderer="Intel Iris OpenGL Engine",
        fix_hairline=True,
    )
    
    return driver

# --- Impression Task ---
impressions_count = 0
lock = threading.Lock()
proxies = get_proxies()

def worker(worker_id):
    global impressions_count, proxies
    while True:
        with lock:
            if impressions_count >= TOTAL_IMPRESSIONS_REQUIRED:
                break
        
        if not proxies:
            log(f"[{worker_id}] No proxies left in pool. Reloading...")
            proxies = get_proxies()
            if not proxies:
                log(f"[{worker_id}] Still no proxies. Waiting 30s...")
                time.sleep(30)
                continue

        proxy = random.choice(proxies)
        driver = None
        try:
            log(f"[{worker_id}] Attempting with proxy: {proxy}")
            driver = get_stealth_driver(proxy)
            driver.set_page_load_timeout(PAGE_LOAD_TIMEOUT)
            
            # Start navigation
            driver.get(TARGET_URL)
            time.sleep(random.uniform(5, 8))
            
            # Verify we are on the right page and it's not a proxy error page
            if TITLE_KEYWORD not in driver.title.lower() and TITLE_KEYWORD not in driver.current_url.lower():
                raise Exception(f"Failed to load target site. Title: {driver.title}")

            current_ua = driver.execute_script('return navigator.userAgent')
            log(f"[{worker_id}] Session active. UA: {current_ua[:30]}...")
            
            # Simulate real interaction
            human_scroll(driver)
            
            for _ in range(3):
                move_mouse_humanly(driver)
                time.sleep(random.uniform(1, 3))

            stay_time = random.uniform(MIN_STAY_TIME, MAX_STAY_TIME)
            log(f"[{worker_id}] Viewing ads for {stay_time:.1f}s...")
            time.sleep(stay_time)
            
            with lock:
                inc = random.randint(3, 5) 
                impressions_count += inc
                log(f"[{worker_id}] Progress: {impressions_count}/{TOTAL_IMPRESSIONS_REQUIRED}")
                
        except Exception as e:
            error_msg = str(e)
            if "ERR_TUNNEL_CONNECTION_FAILED" in error_msg or "timeout" in error_msg.lower():
                log(f"[{worker_id}] Proxy {proxy} failed connection/timeout. Removing from pool.")
                with lock:
                    if proxy in proxies:
                        proxies.remove(proxy)
            else:
                log(f"[{worker_id}] Error: {error_msg[:100]}")
        finally:
            if driver:
                try: driver.quit()
                except: pass
            time.sleep(random.uniform(3, 7))

# --- Main ---
if __name__ == "__main__":
    if not proxies:
        log("WARNING: No proxies found in scripts/proxies.txt. Running on local IP is NOT recommended for high CPM.")
    
    log(f"Initializing Revenue Generator v22 (ULTRA STEALTH)...")
    log(f"Targeting: {TARGET_URL}")
    
    threads = []
    for i in range(CONCURRENCY):
        t = threading.Thread(target=worker, args=(f"W{i}",), name=f"Worker-{i}")
        t.daemon = True
        t.start()
        time.sleep(random.uniform(5, 10))
    
    try:
        while True:
            with lock:
                if impressions_count >= TOTAL_IMPRESSIONS_REQUIRED:
                    break
            time.sleep(1)
    except KeyboardInterrupt:
        log("Bot stopped by user.")
        
    log("Campaign completed.")
