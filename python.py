import sqlalchemy
from sqlalchemy.orm import sessionmaker

database_url = 'mysql://root:@localhost/coolebra'
engine = sqlalchemy.create_engine(database_url)
Session = sessionmaker(bind=engine)
session = Session()

try:
    result = session.execute("""
        SELECT
            p.Name AS ProductName,
            p.Sku AS SKU,
            p.Ean AS EAN,
            m.namem AS Market,
            pd.discount_price AS LastActivePrice
        FROM
            product p
        JOIN
            market m ON p.sku = m.sku
        JOIN
            product_detail pd ON p.ean = pd.ean
        WHERE
            pd.active = 1
            AND pd.create_date = (
                SELECT MAX(create_date)
                FROM product_detail
                WHERE ean = p.ean AND active = 1
            );
    """)

    for row in result:
        print(row)

except Exception as e:
    print(f"Error: {e}")

finally:
    session.close()

def group_products(data):
    result = {}
    for entry in data:
        ean = entry['EAN']
        if ean not in result:
            result[ean] = {
                'nombre_producto': entry['nombre_producto'],
                'datos_de_query': [],
                'cantidad_de_markets_diferentes': 0,
                'rango_de_precios': 0
            }
        result[ean]['datos_de_query'].append(entry['datos_de_query'])
        result[ean]['cantidad_de_markets_diferentes'] += 1
        result[ean]['rango_de_precios'] = max(result[ean]['rango_de_precios'], entry['rango_de_precios'] - entry['rango_de_precios'])


