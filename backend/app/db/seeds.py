import pandas as pd
import sqlite3
from pathlib import Path
import os

def load_data_from_excel():
    # Get the base directory (assuming seeds.py is in backend/app/db/)
    base_dir = Path(__file__).parent.parent.parent
    
    # Connect to the SQLite database
    db_path = os.path.join(base_dir, 'instance', 'database.db')
    conn = sqlite3.connect(db_path)
    
    try:
        # Path to your Excel files (create a data directory if it doesn't exist)
        data_dir = os.path.join(base_dir, 'data')
        
        # Load users from Excel
        users_file = os.path.join(data_dir, 'users.xlsx')
        if os.path.exists(users_file):
            users_df = pd.read_excel(users_file)
            users_df.to_sql('users', conn, if_exists='append', index=False)
            print(f"Loaded {len(users_df)} users")
            
        # Load posts from Excel
        posts_file = os.path.join(data_dir, 'posts.xlsx')
        if os.path.exists(posts_file):
            posts_df = pd.read_excel(posts_file)
            posts_df.to_sql('posts', conn, if_exists='append', index=False)
            print(f"Loaded {len(posts_df)} posts")
            
    except Exception as e:
        print(f"Error loading data: {str(e)}")
        
    finally:
        conn.close()

if __name__ == "__main__":
    load_data_from_excel()
