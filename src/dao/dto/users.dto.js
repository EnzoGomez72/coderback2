class UserDTO {
    constructor(user) {
        this.firstName = user.firstName || user.nombre;
        this.lastName = user.lastName || user.apellido;
        this.email = user.email || user.correo;
        this.role = user.role || user.rol;
        this.age = user.age || user.edad;
    }
}

export default UserDTO;
