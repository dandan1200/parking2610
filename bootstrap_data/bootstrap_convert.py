import csv
import json

csv_file_path = 'bootstrap_data_combined.csv'
json_file_path = 'bootstrap_data.json'

# Initialize a dictionary to hold the data
parking_data = {}

# Read the CSV file
with open(csv_file_path, 'r') as csv_file:
    csv_reader = csv.reader(csv_file)
    headers = next(csv_reader)  # Skip the header row
    
    for row in csv_reader:
        day, lot_type, lot_name, lot_number, total_spaces, time_0700, time_1100, time_1400, time_1600 = row
        
        # Create the lot entry if it doesn't exist
        if lot_number not in parking_data:
            parking_data[lot_number] = {
                "lot_type": lot_type,
                "lot_name": lot_name,
                "lot_number": lot_number,
                "total_spaces": total_spaces,
                "availability_monday": {},
                "availability_tuesday": {},
                "availability_wednesday": {},
                "availability_thursday": {},
                "availability_friday": {}
            }
        
        # Add the availability data
        availability_key = f"availability_{day.lower()}"
        parking_data[lot_number][availability_key] = {
            "0700": time_0700,
            "1100": time_1100,
            "1400": time_1400,
            "1600": time_1600
        }

# Write the JSON output
with open(json_file_path, 'w') as json_file:
    json.dump(list(parking_data.values()), json_file, indent=4)
