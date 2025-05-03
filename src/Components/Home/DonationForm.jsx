import { FiHeart } from 'react-icons/fi';

const DonationForm = ({ donationAmount, setDonationAmount }) => {
  return (
    <div className="donation-section">
      <h3><FiHeart /> Add Donation</h3>
      <p>Support our community projects</p>
      <div className="donation-options">
        {[5, 10, 20, 50].map(amount => (
          <button
            key={amount}
            className={donationAmount === amount ? 'selected' : ''}
            onClick={() => setDonationAmount(amount)}
          >
            ${amount}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DonationForm;
