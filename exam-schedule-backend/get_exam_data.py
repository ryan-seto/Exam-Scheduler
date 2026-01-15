import pandas as pd
import requests
from io import StringIO
import json

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

website_url = 'https://uwaterloo.ca/the-centre/academics/final-examinations/final-examination-schedule'
tables = extract_tables_from_website(website_url)

if tables:
    try:
        # Combine all tables into one DataFrame (if there are multiple tables)
        combined_table = pd.concat(tables, ignore_index=True)
        # Replace NaN values with an empty string or any other placeholder
        combined_table = combined_table.fillna("")
        # Convert the DataFrame to a list of dictionaries
        exam_data = combined_table.to_dict(orient='records')
        
        # Add 'id' field to each dictionary
        for index, item in enumerate(exam_data):
            item['id'] = index + 1  # Incremental ID starting from 1
        
        # Output JSON to stdout
        print(json.dumps(exam_data, indent=2))
        
    except Exception as e:
        print(f"Error processing tables: {str(e)}")
else:
    print("No tables were found on the website or an error occurred.")
