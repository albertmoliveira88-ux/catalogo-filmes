CREATE DATABASE IF NOT EXISTS catalogo_filmes;

USE catalogo_filmes;

DROP TABLE IF EXISTS filmes;

CREATE TABLE filmes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    realizador VARCHAR(255) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    avaliacao INT NULL,
    visto BOOLEAN DEFAULT FALSE
);

INSERT INTO filmes 
(titulo, realizador, genero, ano, tipo, avaliacao, visto)
VALUES
('Interstellar', 'Christopher Nolan', 'ficcao', 2014, 'filme', 5, true),
('Breaking Bad', 'Vince Gilligan', 'drama', 2008, 'serie', 5, true),
('Toy Story', 'John Lasseter', 'animacao', 1995, 'filme', 4, false);