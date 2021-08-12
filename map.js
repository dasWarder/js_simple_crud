

class Database {

    storage;

    constructor() {
        this.storage = [];
    }

    add(obj) {
        console.log('Add to storage');
        this.storage.push(obj);

        return obj;
    };

    get(id) {
        console.log('Receive by id');
        return this.storage[id];
    };

    update(id, obj) {
        console.log('Update object with id=', id);
        this.storage[id] = obj;

        return obj;
    }

    delete(id) {
        console.log('Remove by id=', id);
        this.storage.splice(id);
    };

    getAll() {
        console.log('Receive all');

        return this.storage;
    }
};

class UserDatabase extends Database {

    cache = new Map();
    idGenerator;

    constructor() {
        super();
        this.idGenerator = 1;
    };

    add(user) {
        user.id = this.idGenerator++;
        this.cache.set(user.id, user);
        return super.add(user);
    };

    getById(id) {
        return this.cache.has(id)?
                                this.cache.get(id) : super.get(id);
    };

    getByName(name) {
        let finalUser;
        this.cache.forEach(user => {
            if(user.name === name) {
                finalUser = user;
            }
        });

        return finalUser;
    };

    update(id, user) {

        if(this.cache.has(id)) {
            this.cache.delete(id);
        }
        user.id = id;
        const updated = super.update(id, user);
        this.cache.set(id, updated);

        return updated;
    };

    delete(id) {
        if(this.cache.has(id)) {
            this.cache.delete(id);
        }
        super.delete(id);
    };

    getAll() {

        const users = [];

        this.cache.forEach((v) => {
            if(this.storage.includes(v)) {
                users.push(v);
            }
        });

        return users;
    };
};

const userDatabase = new UserDatabase();

userDatabase.add({ name: 'Alex', surname: 'Petrov', budget: 2500 });

const user = userDatabase.getById(1);

userDatabase.update(1, { name: 'Petr', surname: 'Alexandrov', budget: 3200 });

console.log(userDatabase.getByName('Petr'));
