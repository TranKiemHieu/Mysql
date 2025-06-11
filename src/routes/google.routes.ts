import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';

class AuthRoutes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Google OAuth2 login
    this.router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // Google OAuth2 redirect callback
    this.router.get('/google/redirect',
      passport.authenticate('google', { failureRedirect: '/' }),
      this.handleGoogleRedirect
    );

    // Check current auth status
    this.router.get('/status', this.getAuthStatus);
  }

  private handleGoogleRedirect(request: Request, response: Response) {
    console.log('Google Redirect Session:', request.session);
    console.log('Google Redirect User:', request.user);
    response.sendStatus(200);
  }

  private getAuthStatus(request: Request, response: Response) {
    if (request.user) {
      response.json({
        status: "logged_in",
        user: request.user
      });
    } else {
      response.json({ status: "not_logged_in" });
    }
  }
}

export default new AuthRoutes().router;
