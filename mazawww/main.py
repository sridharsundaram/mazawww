
import webapp2
from info import Info

def main():
  pass

application = webapp2.WSGIApplication([
    ('/info', Info),
    webapp2.Route('/scienceengine', webapp2.RedirectHandler, defaults={'_uri':'http://thesciencegame.mazalearn.com'}),
    ], debug=True)
