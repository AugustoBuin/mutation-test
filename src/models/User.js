// Represents a User entity with required attributes.
class User {
    constructor(id, nome, nivelAcesso, cpf, senha, ativo = true) {
        // Validates required fields and throws error if any are missing
        if (!id || !nome || !nivelAcesso || !cpf || !senha) {
            throw new Error('All fields are required.');
        }

        // Sets user properties
        this.id = id;
        this.nome = nome;
        this.nivelAcesso = nivelAcesso;
        this.cpf = cpf;
        this.senha = senha;
        this.ativo = ativo;
    }
}

module.exports = User;