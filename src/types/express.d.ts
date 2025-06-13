import { User } from '../database/models/user.model';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
    session: Express.Session; // Thêm kiểu session
    sessionID: string; // Thêm kiểu sessionID
  }
}

// Mở rộng express-session
declare module 'express-session' {
  interface SessionData {
    user?: User; // Tùy chọn thêm user vào dữ liệu phiên
  }
}