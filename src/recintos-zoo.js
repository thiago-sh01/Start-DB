class RecintosZoo {
  constructor() {
    this.recintos = [
      {
        numero: 1,
        bioma: "savana",
        tamanhoTotal: 10,
        animaisExistentes: [{ especie: "MACACO", quantidade: 3 }],
      },
      { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
      {
        numero: 3,
        bioma: "savana e rio",
        tamanhoTotal: 7,
        animaisExistentes: [{ especie: "GAZELA", quantidade: 1 }],
      },
      { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
      {
        numero: 5,
        bioma: "savana",
        tamanhoTotal: 9,
        animaisExistentes: [{ especie: "LEAO", quantidade: 1 }],
      },
    ];

    this.especies = {
      LEAO: { tamanho: 3, bioma: ["savana"], carnivoro: true },
      LEOPARDO: { tamanho: 2, bioma: ["savana"], carnivoro: true },
      CROCODILO: { tamanho: 3, bioma: ["rio"], carnivoro: true },
      MACACO: { tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
      GAZELA: { tamanho: 2, bioma: ["savana"], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, bioma: ["savana", "rio"], carnivoro: false },
    };
  }

  analisaRecintos(animal, quantidade) {
    if (!this.especies[animal]) {
      return { erro: "Animal inválido" };
    }

    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const { tamanho, bioma, carnivoro } = this.especies[animal];
    const tamanhoNecessario = quantidade * tamanho;

    const recintosViaveis = this.recintos.filter((recinto) => {
      const animaisExistentes = recinto.animaisExistentes;
      let espacoOcupado = animaisExistentes.reduce(
        (acc, animal) =>
          acc + animal.quantidade * this.especies[animal.especie].tamanho,
        0
      );

      if (
        animaisExistentes.length > 0 &&
        animaisExistentes[0].especie !== animal
      ) {
        espacoOcupado += 1;
      }

      const espacoLivre = recinto.tamanhoTotal - espacoOcupado;

      const biomaAdequado =
        bioma.includes(recinto.bioma) ||
        (animal === "HIPOPOTAMO" && recinto.bioma === "savana e rio");

      const animaisConfortaveis = animaisExistentes.every((animalExistente) => {
        if (carnivoro && animalExistente.especie !== animal) return false;
        if (
          animalExistente.especie === "HIPOPOTAMO" &&
          recinto.bioma !== "savana e rio"
        )
          return false;
        return espacoLivre >= tamanhoNecessario;
      });

      return (
        biomaAdequado && espacoLivre >= tamanhoNecessario && animaisConfortaveis
      );
    });

    if (recintosViaveis.length > 0) {
      return {
        recintosViaveis: recintosViaveis.map((recinto) => {
          const espacoOcupado = recinto.animaisExistentes.reduce(
            (acc, animal) =>
              acc + animal.quantidade * this.especies[animal.especie].tamanho,
            0
          );
          const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
          return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
        }),
      };
    } else {
      return { erro: "Não há recinto viável" };
    }
  }
}

export { RecintosZoo as RecintosZoo };

const zoo = new RecintosZoo();
console.log(zoo.analisaRecintos("MACACO", 2));
