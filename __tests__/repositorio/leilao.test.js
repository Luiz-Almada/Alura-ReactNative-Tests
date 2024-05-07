import { obtemLeiloes } from "../../src/repositorio/leilao";
import apiLeiloes from "../../src/servicos/apiLeiloes";
import React from 'react';

jest.mock("../../src/servicos/apiLeiloes");

const mockLeiloes = [
  {
    id: 1,
    nome: "Leilão",
    descricao: "Descrição do leilão",
  },
];

const mockRequisicao = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: retorno
      })
    }, 200);
  });
}

const mockRequisicaoErro = () => {
  return new Promise((_,reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  })
}

describe("repositorio/leilao", () => {

  // Limpa o mock
  beforeEach(() => {
    apiLeiloes.get.mockClear();
  })

  describe("obtemLeiloes", () => {
    it("deve retornar um lista de leilões", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes));
      const leiloes = await obtemLeiloes();
      expect(leiloes).toEqual(mockLeiloes);
      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });

    it("deve retornar um lista vazia quando a requisição falhar", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());
      const leiloes = await obtemLeiloes();
      expect(leiloes).toEqual([]);
      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1); 
    });

  });

  test('testa o mock do método useEffect', () => {
      jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  });
});
