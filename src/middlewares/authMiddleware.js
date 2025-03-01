/*const auth = (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ status: "Error", message: "No autorizado" });
      }
      
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ status: "Error", message: "Acceso denegado" });
      }
      
      next();
    };
  };
  
  export default auth;*/

  const authRole = (role) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: "No autenticado" });
      }
      if (req.user.role !== role) {
        return res.status(403).json({ message: "No autorizado" });
      }
      next();
    };
  };
  
  export default authRole;