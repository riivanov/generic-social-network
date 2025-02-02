import zxcvbn = require("zxcvbn");
import "./password-strength.scss";

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrengthComponent({
  password,
}: PasswordStrengthProps) {
  const pswdScore = zxcvbn(password).score;

  return (
    <>
      <div className="verticalContainer">
        <p className="strengthText">
          Password Strength:{" "}
          {pswdScore === 0
            ? "Weak"
            : pswdScore === 1
              ? "Fairly Weak"
              : pswdScore === 2
                ? "Average"
                : pswdScore === 3
                  ? "Strong"
                  : pswdScore === 4
                    ? "Very Strong"
                    : ""}
        </p>
        <div className="horizontalContainer">
          {pswdScore === 0 ? (
            <>
              <div className="zero"></div>
              <div className="empty"></div>
              <div className="empty"></div>
              <div className="empty"></div>
              <div className="empty"></div>
              {/* Weak */}
            </>
          ) : pswdScore === 1 ? (
            <>
              <div className="zero"></div>
              <div className="one"></div>
              <div className="empty"></div>
              <div className="empty"></div>
              <div className="empty"></div>
              {/* Fairly weak */}
            </>
          ) : pswdScore === 2 ? (
            <>
              {/* Average */}
              <div className="zero"></div>
              <div className="one"></div>
              <div className="two"></div>
              <div className="empty"></div>
              <div className="empty"></div>
            </>
          ) : pswdScore === 3 ? (
            <>
              {/* Strong */}
              <div className="zero"></div>
              <div className="one"></div>
              <div className="two"></div>
              <div className="three"></div>
              <div className="empty"></div>
            </>
          ) : pswdScore === 4 ? (
            <>
              {/* Very strong */}
              <div className="zero"></div>
              <div className="one"></div>
              <div className="two"></div>
              <div className="three"></div>
              <div className="four"></div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
