import Styles from './moneyModal.module.css';

export default function MoneyModal({ moneyModal, openMoneyModal, list }) {
  const moneyConma: any = list.money.toLocaleString();
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
              <div className={Styles.flex_container_item}> ¥{moneyConma}</div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
