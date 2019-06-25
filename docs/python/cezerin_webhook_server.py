import io
import json
import SocketServer
from BaseHTTPServer import BaseHTTPRequestHandler

# Order Created
def order_Created(client, post_body):
    post_body = unicode(post_body, "utf-8")
    with io.open('data.json', 'w', encoding='utf8') as outfile:
        outfile.write(unicode(post_body)) 
    with open('data.json') as data_file:
        obj = json.load(data_file)
    date_created = obj["date_created"]
    date_placed = obj["date_placed"]
    date_updated = obj["date_updated"]
    number = obj["number"]
    customer_id = obj["customer_id"]
    print("Order Created")

# Order Updated
def order_Updated(client, post_body):
    post_body = unicode(post_body, "utf-8")
    with io.open('data.json', 'w', encoding='utf8') as outfile:
        outfile.write(unicode(post_body)) 
    with open('data.json') as data_file:
        obj = json.load(data_file)
    date_created = obj["date_created"]
    date_placed = obj["date_placed"]
    date_updated = obj["date_updated"]
    number = obj["number"]
    print("Order Updated")

# Order Deleted
def order_Deleted(post_body):
    post_body = unicode(post_body, "utf-8")
    with io.open('data.json', 'w', encoding='utf8') as outfile:
        outfile.write(unicode(post_body)) 
    with open('data.json') as data_file:
        obj = json.load(data_file)
    date_created = obj["date_created"]
    date_placed = obj["date_placed"]
    date_updated = obj["date_updated"]
    number = obj["number"]
    print("Order Deleted")

# Customer Created
def customer_Created(client, post_body):
    post_body = unicode(post_body, "utf-8")
    with io.open('data.json', 'w', encoding='utf8') as outfile:
        outfile.write(unicode(post_body)) 
    with open('data.json') as data_file:
        obj = json.load(data_file)
    customer_id = obj["id"]
    date_created = obj["date_created"]
    date_updated = obj["date_updated"]
    last_name = obj["last_name"]
    first_name = obj["first_name"]
    full_name = obj["full_name"]
    gender = obj["gender"]
    email = obj["email"]
    mobile = obj["mobile"]
    orders_count = obj["orders_count"]
    total_spent = obj["total_spent"]
    password = obj["password"]
    print("Customer Created")

# Customer Updated
def customer_Updated(post_body):
    post_body = unicode(post_body, "utf-8")
    with io.open('data.json', 'w', encoding='utf8') as outfile:
        outfile.write(unicode(post_body)) 
    with open('data.json') as data_file:
        obj = json.load(data_file)
    date_created = obj["date_created"]
    date_updated = obj["date_updated"]
    last_name = obj["last_name"]
    first_name = obj["first_name"]
    full_name = obj["full_name"]
    gender = obj["gender"]
    email = obj["email"]
    mobile = obj["mobile"]
    orders_count = obj["orders_count"]
    total_spent = obj["total_spent"]
    password = obj["password"]
    print("Customer Updated")

# Customer Deleted
def customer_Deleted(post_body):
    post_body = unicode(post_body, "utf-8")
    with io.open('data.json', 'w', encoding='utf8') as outfile:
        outfile.write(unicode(post_body)) 
    with open('data.json') as data_file:
        obj = json.load(data_file)
    date_created = obj["date_created"]
    date_updated = obj["date_updated"]
    last_name = obj["last_name"]
    first_name = obj["first_name"]
    full_name = obj["full_name"]
    gender = obj["gender"]
    email = obj["email"]
    mobile = obj["mobile"]
    orders_count = obj["orders_count"]
    total_spent = obj["total_spent"]
    password = obj["password"]
    print("Customer Deleted")

class MyHandler(BaseHTTPRequestHandler): 
    def do_POST(self):
        if self.path == '/order/created':
            content_len = int(self.headers.getheader('content-length', 0))
            post_body = self.rfile.read(content_len)
            order_Created(post_body)
            self.send_response(200)
        elif self.path == '/order/updated': 
            content_len = int(self.headers.getheader('content-length', 0))
            post_body = self.rfile.read(content_len)
            order_Updated(post_body)
            self.send_response(200)
        elif self.path == '/order/deleted':
            content_len = int(self.headers.getheader('content-length', 0))
            post_body = self.rfile.read(content_len)
            order_Deleted(post_body)
            self.send_response(200)
        elif self.path == '/customer/created':
            content_len = int(self.headers.getheader('content-length', 0))
            post_body = self.rfile.read(content_len)
            customer_Created(post_body)
            self.send_response(200)
        elif self.path == '/customer/updated':
            content_len = int(self.headers.getheader('content-length', 0))
            post_body = self.rfile.read(content_len)
            customer_Updated(post_body)
            self.send_response(200)
        elif self.path == '/customer/deleted':
            content_len = int(self.headers.getheader('content-length', 0))
            post_body = self.rfile.read(content_len)
            customer_Deleted(post_body)
            self.send_response(200)
        else:
            self.send_response(400)

print("Cezerin Webhooks Server")     
httpd = SocketServer.TCPServer(("192.168.1.1", 8876), MyHandler)
print("Server running on " + str(httpd.server_address))
httpd.serve_forever()
