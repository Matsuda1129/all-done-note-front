import Styles from './moneyModal.module.css';

export default function MoneyModal({ moneyModal, openMoneyModal, list }) {
  if (moneyModal) {
    return (
      <div>
        <div className={Styles.overlay}>
          <div className={Styles.content}>
            <button className={Styles.batsu} onClick={openMoneyModal}>
              ×
            </button>
            <form>
              <label>費用</label>
              <div className={Styles.flex_container_item}> ¥{list.money}</div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
