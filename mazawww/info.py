
import logging
import webapp2
from google.appengine.api import mail

class Info(webapp2.RequestHandler):
  
  def post(self):
    name = self.request.get('name')
    email = self.request.get('email')
    phone = self.request.get('phone')
    message = self.request.get('message')

    errors = "";
    msg = ""
    if name == "":
      errors += '"name": "Please enter your name"'
    else:
      msg = "Name: " + name + "\n"
    
    msg += "Phone: " + phone + "\n"
    
    if not mail.is_email_valid(email):
      errors += '"email": "Please enter a valid email address"'
    else:
      msg += "Email: " + email + "\n"
      
    if message == "":
      errors += '"message": "Please enter a message"'
    else:
      msg += "Message: " + message + "\n" 
    
    logging.info(msg)
    self.response.headers['Content-Type'] = 'application/json'
    if errors != "":
      response = '{"success": 0, "errors": {' + errors + '}}'
      logging.info(response)
      self.response.out.write(response)
    else:
      mail.send_mail("admin@mazalearn.com", "info@mazalearn.com", "Request for Information from " + email, msg)
      response = '{"success": 1}'
      logging.info(response)
      self.response.out.write(response)
    
       
    