import React from "react";
import TurnkeyWordpressView from "./TurnkeyWordpressView";

interface SubscriptionViewProps {
  lang: "it" | "en";
  isFacilitated?: boolean;
  setCurrentTab: (tab: string) => void;
}

export const SubscriptionView: React.FC<SubscriptionViewProps> = ({
  lang,
  isFacilitated,
  setCurrentTab,
}) => {
  return (
    <TurnkeyWordpressView
      lang={lang}
      isFacilitated={isFacilitated}
      setCurrentTab={setCurrentTab}
    />
  );
};

export default SubscriptionView;
