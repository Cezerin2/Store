import re
import jwt
import json
import requests
import ConfigParser
from requests import get

#[Load Config]
config = ConfigParser.ConfigParser()
config.readfp(open(r'config.txt'))

#[Read Config]
jwt_key = config.get('Systems', 'jwt_key')
cezerin_webhooks_url = config.get('Systems', 'cezerin_webhooks_url')

#[Variables]
ip_pattern = re.compile(r'\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b')
current_ip = get('https://api.ipify.org').text

#[Auth Token]
def ret_authtoken():
    jwt_payload = { 'email': 'store', 'scopes': ['admin'] }
    auth_token = jwt.encode(jwt_payload, jwt_key, algorithm='HS256')
    return auth_token

#[Cezerin Get Webhooks]
def cezerin_get_webhooks(url):
    headers = {'Content-type': 'application/json','Authorization': 'Bearer ' + ret_authtoken()}
    response = requests.get(url, headers=headers)
    data = response.json()
    for x in range(len(data)):
       webhook_get_ip = re.findall(ip_pattern, data[x]['url'])
       webhook_ip = ' '.join(webhook_get_ip)
       if webhook_ip <> current_ip:
          cezerin_update(data[x]['id'], data[x]['url'])
          print("Webhook IP: " + webhook_ip + " Changed to: " + current_ip)
       else:
          print("Webhook IP: " + webhook_ip + " did not change.")
            
#[Cezerin Update Webhooks]
def cezerin_update(webhookid,webhookurl):
    headers = {'Content-type': 'application/json','Authorization': 'Bearer ' + ret_authtoken()}
    url = cezerin_webhooks_url + "/" + webhookid
    payload = json.dumps({"url": replace_ip(webhookurl)})
    put_response = requests.put(url, headers=headers, data=payload)

#[Replace IP]
def replace_ip(data):
    replaced = re.sub(ip_pattern, str(current_ip), data)
    return replaced

cezerin_get_webhooks(cezerin_webhooks_url)
