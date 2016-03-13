
import webapp2
from info import Info

def get_redirect_url(handler, *args, **kwargs):
    return 'http://thesciencegame.mazalearn.com/reports/sciencejournal.jsp?topic=' + kwargs['topic'] + '&tutor=D1&' + handler.request.query

def main():
  pass

application = webapp2.WSGIApplication([
    ('/info', Info),
    webapp2.Route('/scienceengine', webapp2.RedirectHandler, defaults={'_uri':'http://thesciencegame.mazalearn.com/scienceengine'}),
    webapp2.Route('/science/<board>/<topic>', webapp2.RedirectHandler, defaults={'_uri': get_redirect_url, '_code':302}),    
    webapp2.Route('/science/<board>', webapp2.RedirectHandler, defaults={'_uri': 'http://thesciencegame.mazalearn.com/reports/sciencejournal.jsp', '_code':302}),    
    ], debug=True)

