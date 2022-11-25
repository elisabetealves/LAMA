CREATE TABLE
    IF NOT EXISTS TABELAS_USUÁRIOS (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
    );

CREATE TABLE
    IF NOT EXISTS TABELA_SHOWS (
        id VARCHAR(255) PRIMARY KEY,
        week_day VARCHAR(255) NOT NULL,
        start_time INT NOT NULL,
        end_time INT NOT NULL,
        band_id VARCHAR(255) NOT NULL,
        FOREIGN KEY(band_id) REFERENCES TABELA_BANDAS(id)
    );

CREATE TABLE
    IF NOT EXISTS TABELA_BANDAS (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        music_genre VARCHAR(255) NOT NULL,
        responsible VARCHAR(255) UNIQUE NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS TABELAS_INGRESSOS (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        value DECIMAL(10, 2) NOT NULL,
        show_id VARCHAR(255) UNIQUE NOT NULL,
        quantity INT NOT NULL DEFAULT 0,
        FOREIGN KEY (show_id) REFERENCES NOME_TABELA_SHOWS(id)
    );

CREATE TABLE
    IF NOT EXISTS COMPRAS_DE_INGRESSOS (
        show_id VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (show_id) REFERENCES NOME_TABELA_SHOWS(id),
        FOREIGN KEY (user_id) REFERENCES NOME_TABELAS_USUÁRIOS(id)
    );

CREATE TABLE
    IF NOT EXISTS TABELAS_PHOTO (
        id VARCHAR(255) PRIMARY KEY,
        photo BLOB,
        event_id VARCHAR(255),
        FOREIGN KEY(event_id) REFERENCES NOME_TABELA_SHOWS(id)
    );