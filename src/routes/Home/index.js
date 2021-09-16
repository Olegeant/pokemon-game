import { useHistory } from 'react-router';

import Header from '../../components/Header/Header';
import Layout from '../../components/Layout/Layout';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

import PokemonBg from '../../images/bg1.jpg';
import LandscapeBg from '../../images/bg3.jpg';
import POKEMONS from '../../data/pokemon.json';

import styles from './style.module.css';

function HomePage() {
  const history = useHistory();

  const handleHeaderBtnClick = () => {
    history.push('/game');
  };

  return (
    <>
      <Header
        title="This is title"
        descr="This is Description!"
        onHeaderBtnClick={handleHeaderBtnClick}
      />

      <Layout title="Layout 1" descr="Layout1 description" urlBg={PokemonBg}>
        <p>
          In the game two players face off against one another, one side playing as "blue", the
          other as "red" on a 3x3 grid.
          <br />
          Each player has five cards in a hand and the aim is to capture the opponent's cards by
          turning them into the player's own color of red or blue.
        </p>
        <p>
          To win, a majority of the total ten cards played (including the one card that is not
          placed on the board) must be of the player's card color. To do this, the player must
          capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of
          the sides where the two cards touch will be compared. If the rank of the opponent's card
          is higher than the player's card, the player's card will be captured and turned into the
          opponent's color. If the player's rank is higher, the opponent's card will be captured and
          changed into the player's color instead.
        </p>
      </Layout>

      <Layout title="Layout 2" descr="Layout2 description" colorBg="#FF8080">
        <div className="flex">
          {POKEMONS.map(({ name, id, type, values, img }) => (
            <PokemonCard key={id} name={name} id={id} type={type} values={values} img={img} />
          ))}
        </div>
      </Layout>

      <Layout title="Layout 3" descr="Layout3 description" urlBg={LandscapeBg}>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero tempore labore voluptatum
          dignissimos ipsam ad, ea ipsa aperiam. Temporibus, dolorem.
        </p>
        <p>
          Hic iste earum, eius accusantium dolorem reprehenderit doloremque perspiciatis inventore
          ipsa. Fugit illo totam ipsum explicabo natus, quisquam et aspernatur laborum blanditiis
          corporis cupiditate saepe. Dolore est exercitationem quidem voluptatum aliquam quos
          numquam dicta ullam qui quas? Facere nulla minima illum, maiores nobis quidem sequi est
          quis! Incidunt excepturi esse autem, perferendis neque illo eum amet obcaecati error
          voluptate sequi facilis dolorem dignissimos! Modi, dolorum blanditiis iste fugiat,
          expedita facere aspernatur ut suscipit corrupti eos distinctio.
        </p>
      </Layout>
    </>
  );
}

export default HomePage;
