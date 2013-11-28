
import webapp2
from info import Info

def main():
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write('Hello, World!')

application = webapp2.WSGIApplication(
                                       [
                                         ('/info', Info),
                                        ],
                                       debug=True)
