import facebook from '../../assets/images/footer/facebook.svg';
import In from '../../assets/images/footer/In.svg';
import instagram from '../../assets/images/footer/instagram.svg';
import vk from '../../assets/images/footer/vk.svg';

import s from './footer.module.scss';

export const Footer = () => (
  <section className={s.footer}>
    <div className={s.container}>
      <div className={s.title}>
        <span>© 2020-2023 Cleverland. Все права защищены.</span>
      </div>
      <div className={s.networkContainer}>
        <div className={s.networkIcon}>
          {' '}
          <img alt='facebook' src={facebook} />{' '}
        </div>
        <div className={s.networkIcon}>
          <img alt='instagram' src={instagram} />
        </div>
        <div className={s.networkIcon}>
          <img alt='vk' src={vk} />
        </div>
        <div className={s.networkIcon}>
          <img alt='In' src={In} />
        </div>
      </div>
    </div>
  </section>
);
