import subprocess
import time
import sys

CAMPAIGNS = [
    {"url": "https://bongochoti.com", "title": "bongochoti", "concurrency": 5},
    {"url": "https://www.findyourdoctornearme.com/", "title": "findyourdoctor", "concurrency": 5},
]

def launch():
    processes = []
    print(f"[*] Starting {len(CAMPAIGNS)} campaigns...")
    
    for campaign in CAMPAIGNS:
        cmd = [
            "python", "scripts/revenue_generator_v21.py",
            "--url", campaign["url"],
            "--title", campaign["title"],
            "--concurrency", str(campaign["concurrency"])
        ]
        print(f"[*] Launching {campaign['title']} (Concurrency: {campaign['concurrency']})...")
        p = subprocess.Popen(cmd, creationflags=subprocess.CREATE_NEW_CONSOLE)
        processes.append(p)
        time.sleep(5) # Stagger launches

    print("[*] All campaigns launched in separate windows.")
    print("[*] Press Ctrl+C to exit this launcher (bots will keep running).")
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n[*] Launcher stopped.")

if __name__ == "__main__":
    launch()
