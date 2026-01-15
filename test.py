import re
from pdfminer.high_level import extract_pages, extract_text

text = extract_text("schedule.pdf")


#pattern = re.compile(r'\b[A-Z]{2,5} \d{3}[A-Z]\b')
pattern = re.compile(r'\b[A-Z]{2,5} \d{3}')
matches = pattern.findall(text)
print(matches)
