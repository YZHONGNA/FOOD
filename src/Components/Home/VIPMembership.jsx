import { FiStar } from 'react-icons/fi';

const VIPMembership = ({ onSignup }) => {
  return (
    <div className="vip-membership">
      <h3><FiStar /> Become a VIP Member</h3>
      <p>Get 10% discount on all purchases</p>
      <button onClick={onSignup}>
        Join VIP - $10/month
      </button>
    </div>
  );
};

export default VIPMembership;
