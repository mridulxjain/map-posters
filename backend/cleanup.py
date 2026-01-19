import os
import time

MAX_AGE = 15 * 60  


def cleanup_old_posters(posters_dir):
    if not os.path.exists(posters_dir):
        return

    now = time.time()
    for f in os.listdir(posters_dir):
        path = os.path.join(posters_dir, f)
        if os.path.isfile(path):
            if now - os.path.getmtime(path) > MAX_AGE:
                try:
                    os.remove(path)
                except:
                    pass