INSERT INTO department(name)
VALUES
    ('HR'),
    ('Sales'),
    ('Customer Service'),
    ('Engineering');



INSERT INTO roles(title, salary, department_id)
VALUES
    ('Sales Lead', 50000, 2),
    ('Salesperson', 42000, 2),
    ('Account Manager', 65000, 3),
    ('Accountant', 50000, 3),
    ('Senior Engineer', 80000, 4),
    ('Junior Engineer', 60000, 4),
    ('HR Director', 60000, 1),
    ('Recruiter', 40000, 1);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
    /*Management team*/
    ('James', 'Fraser', 1, NULL), /*Sales Lead 1*/
    ('Jack', 'London', 3, NULL), /*Account Manager 2*/
    ('Robert', 'Bruce', 5, NULL), /*Senior Engineer 3*/
    ('Peter', 'Greenaway', 7, NULL), /*HR Director 4*/

    /*sales team*/
    ('Derek', 'Jarman', 2, 1),
    ('Paolo', 'Pasolini', 2, 1),
    ('Heathcote', 'Williams', 2, 1),

    /*accounting team*/
    ('Sandy', 'Powell', 4, 2),
    ('Emil', 'Zola', 4, 2),
    ('Sissy', 'Coalpits', 4, 2),

    /*engineering team*/
    ('Antoinette', 'Capet', 6, 3),
    ('Samuel', 'Delany', 6, 3),
    ('Tony', 'Duvert', 6, 3),

    /*HR team*/
    ('Dennis', 'Cooper', 8, 4),
    ('Monica', 'Bellucci', 8, 4),
    ('Samuel', 'Johnson', 8, 4);