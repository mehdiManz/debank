import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Time "mo:base/Time";

actor DBank {
  stable var currentValue : Float = 300.0;
  currentValue := 300.0;
  Debug.print(debug_show (currentValue));
  stable var startTime = Time.now();
  Debug.print(debug_show (startTime));
  let id : Nat = 17458;

  // Debug.print(debug_show (id));

  public func topUp(amount : Float) {
    currentValue += amount;
    Debug.print("Current balance: " # debug_show (currentValue));
  };

  public func withdraw(amount : Float) {
    if (amount > currentValue) {
      Debug.print("It's more than what you have!");
    } else {
      currentValue -= amount;
      Debug.print("Current balance: " # debug_show (currentValue));
    };
  };

  public query func checkBalance() : async Float {
    Debug.print("Current balance: " # debug_show (currentValue));
    return currentValue;
  };
  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNs = Float.fromInt(currentTime - startTime);
    let timeElapsedS = timeElapsedNs / 1000000000.0;
    let interest = Float.pow(1.01, timeElapsedS);
    currentValue := currentValue * interest;
    startTime := currentTime;
  };

};
