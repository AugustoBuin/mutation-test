class User {
    constructor(id, nome, nivelAcesso, cpf, senha, ativo = true) {
        if (!id || !nome || !nivelAcesso || !cpf || !senha) {
            throw new Error('Todos os campos são obrigatórios.');
        }
        this.id = id;
        this.nome = nome;
        this.nivelAcesso = nivelAcesso;
        this.cpf = cpf;
        this.senha = senha;
        this.ativo = ativo;
    }
}

module.exports = User;