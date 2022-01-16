import { Expansion, Series } from '@app/pages';

export class ExpansionFactory {
  expansions = [
    {
      name: 'Battle Styles',
      logo: 'https://pod.pokellector.com/logos/Battle-Styles.logo.305.png',
      release_date: new Date(),
      code: 'battle-styles',
    },
    {
      name: 'Vivid Voltage',
      logo: 'https://pod.pokellector.com/logos/Vivid-Voltage.logo.299.png',
      release_date: new Date(),
      code: 'vivid-voltage',
    },
    {
      name: 'Cosmic Eclipse',
      logo: 'https://pod.pokellector.com/logos/Cosmic-Eclipse.logo.280.png',
      release_date: new Date(),
      code: 'cosmic-eclipse',
    },
  ];
  createExpasion() {
    return new Expansion(
      this.expansions[Math.floor(Math.random() * this.expansions.length)]
    );
  }
}

export class SeriesFactory {
  series = [
    {
      name: 'Sword & Shield',
      id: 1,
    },
    {
      name: 'Sun & Moon',
      id: 2,
    },
    {
      name: 'XY',
      id: 3,
    },
  ];
  createSeries(seriesCount: number = 1, expansionCount: number = 0): Series[] {
    let series: Series[] = [];
    Array.from(Array(seriesCount)).forEach(() => {
      var randomSeries = new Series(
        this.series[Math.floor(Math.random() * this.series.length)]
      );
      if (expansionCount > 0) {
        var factory = new ExpansionFactory();
        Array.from(Array(expansionCount)).forEach(() => {
          randomSeries.expansions.push(factory.createExpasion());
        });
      }
      series.push(randomSeries);
    });
    return series;
  }
}
