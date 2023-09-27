import pandas as pd



# Load data from Excel file
products_df = pd.read_excel('packwise_calculator.xlsx', sheet_name='Products')
orders_df = pd.read_excel('packwise_calculator.xlsx', sheet_name='Orders')
cartons_df = pd.read_excel('packwise_calculator.xlsx', sheet_name='Carton Sizes')


def 



# if __name__ == '__main__':
#     # Read input data from a JSON file
#     input_path = '/tmp/input.json'
#     packages_path = '/tmp/packages.json'
#     orders_path = '/tmp/orders.json'
#     output_path = '/tmp/output.json'
    
#     # Read input data from JSON files
#     with open(input_path, 'r') as f:
#         data = json.load(f)
#     with open(packages_path, 'r') as f:
#         packages = json.load(f)
#     with open(orders_path, 'r') as f:
#         orders = json.load(f)
#     #! old way would write to file
#     # with open('pages/api/python/input.json', 'r') as f:
#     #     data = json.load(f)
#     # with open('pages/api/python/packages.json', 'r') as f:
#     #     packages = json.load(f)
#     # with open('pages/api/python/orders.json', 'r') as f:
#     #     orders = json.load(f)
        
#     results = pack_items(data)
    
#     with open(output_path, 'w') as f:
#         json.dump(results, f, cls=DecimalEncoder, indent=4)
#     # with open('pages/api/python/output.json', 'w') as f:
#     #     json.dump(results, f, cls=DecimalEncoder, indent=4)
