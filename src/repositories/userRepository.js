const users = [];

class UserRepository {
    findById(id) {
        return users.find(user => user.id === id);
    }

    save(user) {
        users.push(user);
        return user;
    }

    update(id, data) {
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return null;
        users[index] = { ...users[index], ...data };
        return users[index];
    }

    delete(id) {
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return false;
        users.splice(index, 1);
        return true;
    }

    deactivate(id) {
        const user = this.findById(id);
        if (!user) return null;
        user.ativo = false;
        return user;
    }
}

module.exports = new UserRepository();