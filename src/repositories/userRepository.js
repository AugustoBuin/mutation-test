// In-memory storage and operations for users
const users = [];

class UserRepository {
    // Finds user by ID or returns undefined
    findById(id) {
        return users.find(user => user.id === id);
    }

    // Adds new user to the list and returns it
    save(user) {
        users.push(user);
        return user;
    }

    // Updates user fields if found; returns updated user or null
    update(id, data) {
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return null;
        users[index] = { ...users[index], ...data };
        return users[index];
    }

    // Removes user by ID; returns true if found and deleted, otherwise false
    delete(id) {
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return false;
        users.splice(index, 1);
        return true;
    }

    // Marks user as inactive by setting ativo to false; returns updated user or null
    deactivate(id) {
        const user = this.findById(id);
        if (!user) return null;
        user.ativo = false;
        return user;
    }
}

module.exports = new UserRepository();