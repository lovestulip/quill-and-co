// PostHog initialization — Quill & Co

!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+" (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTrackedEvent".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

posthog.init('phc_yHkuEJgTR8SpqPtM7cTUqZAMMPA2pLMbwrjX2VAtMzkL', {
    api_host: 'https://us.i.posthog.com',

    // BUG 1: should be 'identified_only' — 'always' creates a full person profile
    // for every anonymous visitor, billing them at the identified-person rate
    person_profiles: 'always',

    autocapture: true,
    capture_pageview: true,

    session_recording: {
        sample_rate: 1.0,
        minimum_duration: 0,
        maskAllInputs: false,
    },

    // BUG 9: web vitals are being collected but no one is looking at them,
    // no alerts or insights are configured, and they can be turned off with one click
    capture_performance: {
        web_vitals: true,
        network_timing: true,
    },

    loaded: function(ph) {
        // BUG 2: identify() called on every page load — should only fire
        // after a real login/signup event, not on every anonymous page view
        var userId = localStorage.getItem('qc_user_id');
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('qc_user_id', userId);
        }
        ph.identify(userId, {
            name: 'Demo Shopper',
            plan: 'free',
            signup_source: 'organic',
        });

        // BUG 10: group() called on every page load, not just on login —
        // mirrors the real SamCart bug where groupidentify ran on every request
        ph.group('store', 'quill-and-co', {
            name: 'Quill & Co',
            industry: 'lifestyle-retail',
            region: 'US',
        });
    },
});

function resetDemo() {
    posthog.reset(true);
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'index.html';
}
