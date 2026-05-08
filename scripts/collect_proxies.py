import requests
import threading
import time
import os

PROXY_SOURCES = [
    "https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all",
    "https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks5&timeout=10000&country=all&ssl=all&anonymity=all",
    "https://proxylist.geonode.com/api/proxy-list?limit=500&page=1&sort_by=lastChecked&sort_type=desc",
    "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt",
    "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks5.txt",
    "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt",
    "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks5.txt",
    "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt",
    "https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt"
]

import argparse

# --- Configuration ---
parser = argparse.ArgumentParser(description="Proxy Collector")
parser.add_argument("--url", default="https://www.findyourdoctornearme.com/", help="URL to test proxies against")
args = parser.parse_args()

TEST_URL = args.url
OUTPUT_FILE = "scripts/proxies.txt"
TIMEOUT = 12

def log(msg):
    print(f"[*] {msg}")

def get_geonode_proxies(url):
    try:
        res = requests.get(url, timeout=10)
        data = res.json()
        return [f"{p['ip']}:{p['port']}" for p in data.get('data', [])]
    except Exception as e:
        log(f"Error fetching from Geonode: {e}")
        return []

def get_raw_proxies(url):
    try:
        res = requests.get(url, timeout=10)
        return [p.strip() for p in res.text.split('\n') if p.strip()]
    except Exception as e:
        log(f"Error fetching from {url}: {e}")
        return []

working_proxies = []
lock = threading.Lock()

def verify_proxy(proxy, protocol="http"):
    global working_proxies
    proxies = {
        "http": f"{protocol}://{proxy}",
        "https": f"{protocol}://{proxy}"
    }
    try:
        start = time.time()
        res = requests.get(TEST_URL, proxies=proxies, timeout=TIMEOUT, verify=False)
        if res.status_code == 200 or res.status_code == 403:
            latency = time.time() - start
            with lock:
                working_proxies.append(proxy)
                log(f"[+] Working ({latency:.2f}s): {proxy}")
                return True
    except:
        pass
    return False

def main():
    log("Fetching proxies from internet sources...")
    all_proxies = set()
    
    for url in PROXY_SOURCES:
        if "geonode" in url:
            all_proxies.update(get_geonode_proxies(url))
        else:
            all_proxies.update(get_raw_proxies(url))
            
    log(f"Found {len(all_proxies)} potential proxies. Testing...")

    threads = []
    for proxy in list(all_proxies)[:200]: # Test first 200 for speed
        # Try as both http and socks5 if unknown
        t = threading.Thread(target=verify_proxy, args=(proxy, "http"))
        # t = threading.Thread(target=verify_proxy, args=(proxy, "socks5")) # Can add more
        t.start()
        threads.append(t)
        if len(threads) > 50: # Control concurrency
            for th in threads: th.join()
            threads = []
            
    for th in threads: th.join()

    log(f"Completed verification. Found {len(working_proxies)} working proxies.")
    
    if working_proxies:
        with open(OUTPUT_FILE, "a") as f:
            f.write("\n# Collected from Internet on " + time.ctime() + "\n")
            for p in working_proxies:
                f.write(p + "\n")
        log(f"Added {len(working_proxies)} proxies to {OUTPUT_FILE}")
    else:
        log("No working proxies found. Free proxies are highly unstable.")

if __name__ == "__main__":
    main()
