import { ThreadLikeVisibility } from "./thread_like_visibility";

const addObserverIfDesiredNodeAvailable = () => {
    const contentBody = document.getElementById('contents-body-ocean');
    if (contentBody) {
        const visibility = new ThreadLikeVisibility();
        visibility.hideLikeConts();
        visibility.visibleLikeToClicked();
        const hideLikeContsObserver = new MutationObserver(visibility.hideLikeConts);
        hideLikeContsObserver.observe(contentBody, {childList: true, subtree: true});
        const visibleLiketoClickedObserver = new MutationObserver(visibility.visibleLikeToClicked);
        visibleLiketoClickedObserver.observe(contentBody, {childList: true, subtree: true});
    }
};

addObserverIfDesiredNodeAvailable();
