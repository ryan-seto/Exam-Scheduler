import pandas as pd
import requests
from io import StringIO
import json

# Function to extract tables from a website
def extract_tables_from_website(url):
    try:
        # Fetch HTML content from the URL
        response = requests.get(url)
        if response.status_code == 200:
            # Wrap HTML content in StringIO
            html_string = StringIO(response.text)
            # Parse HTML and extract tables
            tables = pd.read_html(html_string)
            return tables
        else:
            print(f"Failed to fetch URL: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error fetching URL: {str(e)}")
        return None

# URL of the website with tables
website_url = 'https://uwaterloo.ca/registrar/final-examinations/exam-schedule'

# Extract tables from the website
tables = extract_tables_from_website(website_url)

if tables:
          print(f"Number of tables extracted: {len(tables)}")
     # Process the extracted tables
for idx, table in enumerate(tables): 
         print(f"Table {idx + 1}:")
         # Set display options to show all rows and columns
         pd.set_option('display.max_rows', None)
         # pd.set_option('display.max_columns', None)
         print(table)  # Print each table
else:
     print("No tables were found on the website or an error occurred.")

