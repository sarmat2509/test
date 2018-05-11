(function () {
    const viewDemo = {
        youtubeVideoAPIkey: 'AIzaSyAT8VZrTlB7TBt2sgfLjRFLNL8AUvoWwns',
        playlistId: 'PLpfipw7KaEwYm90Fu5Ns-OnDeAEBGuEtC',
        classes: {
            container: 'view-demo',
            containerNoForm: 'view-demo--no-form',
            containerHideForm: 'view-demo--hide-form',
            containerFormBounce: 'view-demo--form-bounce',
            containerLoaded: 'view-demo--loaded',
            list: 'view-demo__list',
            video: 'view-demo__video',
            title: 'view-demo__title',
            description: 'view-demo__description',
            nextTitle: 'view-demo__next-title',
            nextBtn: 'view-demo__next-btn',
            relatedList: 'view-demo__related-list',
            thumb: 'view-demo__thumb',
            thumbActive: 'view-demo__thumb--active',
            thumbPlaying: 'view-demo__thumb--playing',
            shareInput: 'view-demo__share-input',
            copyBtn: 'view-demo__copy-btn',
            shareToggle: 'view-demo__share-toggle',
            shareTooltip: 'view-demo__share-tooltip',
            shareTooltipActive: 'view-demo__share-tooltip--active',
            shareTooltipSuccess: 'view-demo__share-tooltip--success',
            hideShareTooltipSuccess: 'view-demo__share-tooltip--hide-success',
            shareClose: 'view-demo__share-close',
            shareBtn: 'view-demo__share-btn',
            shareList: 'view-demo__share-list',
            formField: 'view-demo__form-field',
            formSelect: 'view-demo__form-select',
            formPlaceholder: 'view-demo__form-placeholder',
            formPlaceholderFilled: 'view-demo__form-placeholder--filled',
            formPlaceholderFocus: 'view-demo__form-placeholder--focus',
            formPlaceholderText: 'view-demo__form-placeholder-text',
            hiddenForm: 'view-demo--hidden-form',
            overlay: 'view-demo__overlay',
            footerWrap: 'footer_wrap'
        },
        additionalData: {
            'O1U-zgS9Dz8': {
                title: 'RingCentral Office Overview'
            },
            'ArrBkuWU2AE': {
                title: 'HD Video Conferencing'
            },
            'gx9FSKsNseQ': {
                title: 'Cloud PBX'
            },
            '__0SPHdidMs': {
                title: 'Cloud PBX'
            },
            'bJX44pbRXhk': {
                title: 'Cloud PBX'
            },
            'UMqxObS0eXk': {
                title: 'Call Management 1'
            },
            'dGoORiSEm6I': {
                title: 'Call Management 1'
            },
            '3-I9dsB-YsA': {
                title: 'Call Management 2'
            },
            'gu9JRt_ZkcE': {
                title: 'Call Management 2'
            },
            'x7pWiuUVzpI': {
                title: 'Voicemail-to-Email'
            },
            'SP6GixAVHM0': {
                title: 'Voicemail-to-Email'
            },
            'VCD3-KsmMHo': {
                title: 'Mobile Apps'
            },
            'Rcgh_oODNtc': {
                title: 'Mobile Apps'
            },
            'mjW2EgdnMvU': {
                title: 'Business SMS'
            },
            'S3-kSkBva6M': {
                title: 'RingCentral Meetings'
            },
            'jjB7D4dQ5yU': {
                title: 'Cloud PBX'
            },
            'jEHO8PacXi8': {
                title: 'How to use RingCentral Meetings'
            },
            'N1TYUukoFpY': {
                title: 'HD Video Meetings'
            },
            'bi_DQh3W_Aw': {
                title: 'Business App Integrations'
            },
            'Z39mwYURMy8': {
                title: 'Conference Calling'
            },
            'TYS-38PU-nc': {
                title: 'Ease of Use'
            },
            'ByCryf6TTbE': {
                title: 'Integrations'
            },
            'KXQOa7P_97A': {
                title: 'Online Fax'
            },
            '1t99Hjevus8': {
                title: 'Online Fax'
            },
            '2t4OwkGVrUI': {
                title: 'Salesforce Integration'
            },
            'atrbEOW138I': {
                title: 'Salesforce Integration'
            },
            'RDeRgKMyIU0': {
                title: 'Conferencing'
            },
            'ntrrbVkl67Y': {
                title: 'Ease of Management'
            }
        },
        player: null,
        videosList: [],
        activeVideo: null,
        nextVideo: null,
        firstVideoId: 'O1U-zgS9Dz8',
        pageQueryParams: null,
        demoVideoIdParamName: 'demo-video-id',
        demoVideoIdParamValue: null,
        activeVideoThumb: null,
        playing: false,
        init: function () {
            const self = this;
            self.initForm();
            self.initSharing();
            self.fetchVideosList(function(items){
                self.videosList = self.parseVideoList(items);
                self.getThumbsList({
                    appendTo: $('.' + self.classes.list),
                    items: self.videosList
                });
                self.loadYoutubeAPI(function(){
                    self.pageQueryParams = self.getPageQueryParams();
                    self.demoVideoIdParamValue = self.getDemoVideoIdQueryParam();
                    self.setActiveVideo(self.demoVideoIdParamValue !== null ? self.demoVideoIdParamValue : self.firstVideoId);
                    $('.' + self.classes.container).addClass(self.classes.containerLoaded);
                });
            });
            $(document).on('click', '.' + self.classes.thumb, function(){
                self.setActiveVideo($(this).data('video-id'));
            });
            $(document).on('click', '.' + self.classes.copyBtn, function(){
                self.copyShareLinkToClipboard();
            });
            $(document).on('click', '.' + self.classes.nextBtn, function(){
                self.setActiveVideo(self.nextVideo.id);
            });
            $(document).on('click', '.' + self.classes.shareToggle, function(){
                self.showShareTooltip();
            });
            $(document).on('click', '.' + self.classes.shareClose, function(){
                self.hideShareTooltip();
            });
            $(document).on('click', '.' + self.classes.overlay, function(){
                $('.' + self.classes.container).addClass(self.classes.containerFormBounce);
                setTimeout(function(){
                    $('.' + self.classes.container).removeClass(self.classes.containerFormBounce);
                }, 600);
            });
        },
        showShareTooltip: function(){
            const self = this;
            const shareTooltip = $('.' + self.classes.shareTooltip);
            const footerWrap = $('.' + self.classes.footerWrap);
            const tooltipFooterIntersection =  shareTooltip.offset().top + shareTooltip.outerHeight() + 5 - footerWrap.offset().top;
            if(tooltipFooterIntersection > 0){
                $('html, body').animate({scrollTop: "+=" + tooltipFooterIntersection}, 300);
            }
            shareTooltip.addClass(self.classes.shareTooltipActive);
        },
        hideShareTooltip: function(){
            const self = this;
            $('.' + self.classes.shareTooltip).removeClass(self.classes.shareTooltipActive);
        },
        copyShareLinkToClipboard: function(){
            const self = this;
            const input = $('.' + self.classes.shareInput);
            input[0].select();
            document.execCommand("Copy");
            $('.' + self.classes.shareTooltip).addClass(self.classes.shareTooltipSuccess);
            setTimeout(function(){
                $('.' + self.classes.shareTooltip).addClass(self.classes.hideShareTooltipSuccess);
                input.trigger('blur');
                setTimeout(function(){
                    $('.' + self.classes.shareTooltip)
                        .removeClass(self.classes.hideShareTooltipSuccess)
                        .removeClass(self.classes.shareTooltipSuccess);
                }, 500)
            }, 2000)
        },
        initSharing: function(){
            const self = this;
            if(typeof addthis !== 'undefined'){
                addthis.share({
                    'container_selector': '.' + self.classes.shareList,
                    'button_selector': '.' + self.classes.shareBtn,
                    'click': function(data){
                        console.log(data);
                    }
                });
            }
        },
        updateSharingUrls: function(){
            const self = this;
            const link = 'https://youtu.be/' + self.activeVideo.id;

            $('.' + self.classes.shareBtn).attr({
                'data-url': link,
                'data-title': self.activeVideo.title
            });

            $('.' + self.classes.shareInput).val(link);
        },
        initForm: function(){
            const self = this;
            if(document.cookie.indexOf('gw_submitliew=yes') !== -1){
                self.trackIsFormSubmitted();
                $('.' + self.classes.container).addClass(self.classes.containerNoForm);
                return false;
            }
            $(function(){
                if(typeof SFLApp !== 'undefined'){
                    const app = new SFLApp();

                    const config = {
                        formid: '#LDSFForm',
                        submitid: '#LDsubmitform',
                        id: 46,
                        fieldsset: 'set12'
                    };

                    const h = {
                        success: function () {
                            self.hideForm();
                        }
                    };
                    if (app.init(config, h)) {
                        app.run();
                    }
                }
            });
            $('.' + self.classes.formSelect).each(function(){
                const placeholder = $(this).closest('.' + self.classes.formField).find('.' + self.classes.formPlaceholder);
                const placeholderText = placeholder.find('.' + self.classes.formPlaceholderText);

                let clicked = false;

                $(this)
                    .one('focusin focusout', function () {
                        let val = $(this).val();
                        if (val === -1 || val === null) {
                            val = $(this).attr('defvalue');
                            $(this).val(val);
                        }
                        let text = $('option:selected', this).text();
                        placeholderText.text(text);
                        placeholder.addClass(self.classes.formPlaceholderFilled);
                        return true;
                    })
                    .on('click', function () {
                        clicked = true;
                        placeholder.toggleClass(self.classes.formPlaceholderFocus);
                    })
                    .one('change', function () {
                        placeholder.addClass(self.classes.formPlaceholderFilled);
                        return true;
                    })
                    .on('change', function () {
                        let text = $('option:selected', this).text();
                        placeholderText.text(text);
                        return true;
                    })
                    .on('keyup', function (e) {
                        let code = e.which;
                        if (code === 38 || code === 40) {
                            let text = $('option:selected', this).text();
                            placeholderText.text(text);
                        }
                    });
                $('body').on('click', function(){
                    if(!clicked) placeholder.removeClass(self.classes.formPlaceholderFocus);
                    clicked = false;
                })
            })

        },
        trackIsFormSubmitted: function(){
            if (typeof ((window.dataLayer || {}).eventer || {}).createCustomEvent !== "undefined") {
                window.dataLayer.eventer.createCustomEvent('Video Form');
            }
        },
        hideForm: function(){
            const self = this;
            document.cookie = "gw_submitliew=yes; path=/; expires=" + (new Date((new Date()).getTime() + (90 * 24 * 60 * 60 * 1000))).toGMTString();
            self.trackIsFormSubmitted();
            $('.' + self.classes.container).addClass(self.classes.containerHideForm);
            self.player.playVideo();
        },
        getDemoVideoIndexByVideoId: function(videoId){
            const self = this;
            let index = 0;
            for(let i = 0; i < self.videosList.length; i++){
                if(self.videosList[i].id === videoId) index = i;
            }
            return index;
        },
        getPageQueryParams: function(){
            const self = this;
            const searchStr = location.search.substring(1);
            let params = {};
            if(searchStr) {
                params = {};
                const searchArray = searchStr.split('&');
                searchArray.forEach(function (paramStr) {
                    const paramArray = paramStr.split('=');
                    params[paramArray[0]] = paramArray[1];
                })
            }
            return params;
        },
        getDemoVideoIdQueryParam: function(){
            const self = this;
            let videoId = null;
            if(
                typeof self.pageQueryParams === 'object' &&
                typeof self.pageQueryParams[self.demoVideoIdParamName] !== 'undefined'
            ){
                videoId = self.pageQueryParams[self.demoVideoIdParamName];
            }
            return videoId;
        },
        serializeObjectToQueryString: function(object) {
            let queryArray = [];
            for (let property in object){
                if (object.hasOwnProperty(property)) {
                    queryArray.push(encodeURIComponent(property) + "=" + encodeURIComponent(object[property]));
                }
            }
            return queryArray.join("&");
        },
        setActiveVideo: function(videoId){
            const self = this;
            if(typeof videoId !== 'string') return false;

            if(self.activeVideo !== null) {
                if(self.activeVideo.id === videoId){
                    return false;
                }
                self.trackStop();
            }

            self.hideShareTooltip();

            const videoIndex = self.getDemoVideoIndexByVideoId(videoId);

            self.activeVideo = self.videosList[videoIndex];
            self.nextVideo = typeof self.videosList[videoIndex+1] !== 'undefined' ? self.videosList[videoIndex+1] : self.videosList[0];
            if(self.player === null){
                self.setPlayer(self.activeVideo.id);
            } else {
                self.player.loadVideoById(self.activeVideo.id);
            }
            $('.' + self.classes.title).html(self.activeVideo.customTitle || self.activeVideo.title);
            $('.' + self.classes.description).html(self.activeVideo.description);
            $('.' + self.classes.nextTitle).html(self.nextVideo.customTitle || self.nextVideo.title);

            if((self.demoVideoIdParamValue === null && videoId !== self.firstVideoId) || (self.demoVideoIdParamValue !== null && self.demoVideoIdParamValue !== videoId)){
                self.pageQueryParams[self.demoVideoIdParamName] = videoId;
                self.demoVideoIdParamValue = videoId;
                const url = [location.protocol, '//', location.host, location.pathname].join('');
                const query = '?' + self.serializeObjectToQueryString(self.pageQueryParams);
                history.pushState(null, '', url + query);
            }

            self.setVideoThumbActiveClass();
            self.updateSharingUrls();
        },
        setVideoThumbActiveClass: function(){
            const self = this;
            const thumbsList = $('.' + self.classes.list);
            const activeVideoThumb = $('.' + self.classes.thumb).filter(function(){
                return $(this).data('video-id') === self.activeVideo.id
            });
            activeVideoThumb.addClass(self.classes.thumbActive);
            if(
                activeVideoThumb.offset().top - thumbsList.offset().top - thumbsList.outerHeight() > 0 ||
                activeVideoThumb.offset().top + activeVideoThumb.outerHeight() < thumbsList.offset().top
            ){
                thumbsList.animate({scrollTop: activeVideoThumb.offset().top - thumbsList.offset().top + thumbsList.scrollTop()}, 500);
            }
            $('.' + self.classes.thumbActive).filter(function(){
                return $(this).data('video-id') !== self.activeVideo.id
            }).removeClass(self.classes.thumbActive);
        },
        setVideoThumbPlayingClass: function(){
            const self = this;
            $('.' + self.classes.thumb).filter(function(){
                return $(this).data('video-id') === self.activeVideo.id
            }).toggleClass(self.classes.thumbPlaying);
        },
        unsetVideoThumbPlayingClass: function(){
            const self = this;
            $('.' + self.classes.thumbPlaying).removeClass(self.classes.thumbPlaying);
        },
        loadYoutubeAPI: function(callback){
            const self = this;

            if(window.isYouTubeIframeAPIReady){
                callback();
            } else {
                const ytScript = document.createElement('script');
                const firstScriptTag = document.getElementsByTagName('script')[0];

                window.onYouTubeIframeAPIReady = function(){
                    window.isYouTubeIframeAPIReady = true;
                    callback();
                };
                ytScript.setAttribute("async", "");
                ytScript.src = "https://www.youtube.com/iframe_api";
                firstScriptTag.parentNode.insertBefore(ytScript, firstScriptTag);
            }
        },
        getYoutubeAPIPlaylistUrl: function(){
            if(typeof this.playlistId !== 'string' || typeof this.youtubeVideoAPIkey !== 'string') return null;
            return 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + this.playlistId + '&key=' + this.youtubeVideoAPIkey + '&maxResults=50&fields=items(snippet(resourceId(videoId)))';
        },
        getYoutubeAPIVideosUrl: function(videoIdArray){
            if(!$.isArray(videoIdArray) || typeof this.youtubeVideoAPIkey !== 'string') return null;
            return 'https://www.googleapis.com/youtube/v3/videos?id=' + videoIdArray.join(',') + '&key=' + this.youtubeVideoAPIkey + '&fields=items(id,snippet(title,description,thumbnails(medium(url),high(url))),contentDetails(duration),statistics(viewCount))&part=snippet,contentDetails,statistics';
        },
        fetchVideosList: function(callback){
            const self = this;
            const playlistUrl = self.getYoutubeAPIPlaylistUrl();
            if(playlistUrl){
                $.get(playlistUrl, function(data) {
                    const videoIdArray = [];
                    data.items.forEach(function(item){
                        videoIdArray.push(item.snippet.resourceId.videoId);
                    });
                    const videosUrl = self.getYoutubeAPIVideosUrl(videoIdArray);
                    if(videosUrl){
                        $.get(videosUrl, function(data) {
                            if(typeof callback !== 'undefined') callback(data.items);
                        });
                    }
                });
            }
        },
        getThumbsList: function(options){
            const self = this;
            const defaultOptions = {
                appendTo: null,
                items: [],
                type: 'default' // default, related
            };
            options = $.extend({}, defaultOptions, options);

            let previewListHTML = '';

            if(
                typeof options.appendTo !== 'undefined' &&
                options.appendTo instanceof $ &&
                options.appendTo.length &&
                options.items.length
            ){
                options.items.forEach(function(video) {
                    previewListHTML += self.getThumb(video);
                    self.trackInit(video.id, video.customTitle || video.title);
                });
                options.appendTo.html(previewListHTML);
            }
        },
        parseVideoList: function(items){
            const self = this;
            if(!$.isArray(items) || !items.length) return false;

            const videoList = [];
            items.forEach(function(item, itemIndex) {
                videoList[itemIndex] = self.parseVideoItem(item);
            });
            return videoList;
        },
        parseVideoItem: function(item){
            const self = this;
            const video = {};
            if(typeof item.id === 'string' && item.id.length) {
                video.id = item.id;
            }
            if(typeof item.snippet !== 'undefined'){
                if (typeof item.snippet.title === 'string' && item.snippet.title.length) {
                    video.title = item.snippet.title;
                }
                if (typeof item.snippet.description === 'string' && item.snippet.description.length) {
                    video.description = item.snippet.description;
                }
                if (typeof item.snippet.thumbnails !== 'undefined') {
                    video.image = {};
                    if (
                        typeof item.snippet.thumbnails.medium !== 'undefined' &&
                        typeof item.snippet.thumbnails.medium.url === 'string' &&
                        item.snippet.thumbnails.medium.url.length
                    ) {
                        video.image.small = item.snippet.thumbnails.medium.url;
                    }
                    if (
                        typeof item.snippet.thumbnails.high !== 'undefined' &&
                        typeof item.snippet.thumbnails.high.url === 'string' &&
                        item.snippet.thumbnails.high.url.length
                    ) {
                        video.image.large = item.snippet.thumbnails.high.url;
                    }
                }
            }
            if(
                typeof item.contentDetails !== 'undefined' &&
                typeof item.contentDetails.duration === 'string' &&
                item.contentDetails.duration.length
            ){
                video.duration = self.formatDuration(item.contentDetails.duration);
            }
            if(
                typeof item.statistics !== 'undefined' &&
                typeof item.statistics.viewCount === 'string' &&
                item.statistics.viewCount.length
            ){
                video.views = self.formatViewCount(item.statistics.viewCount);
            }

            // fit to current logic
            if (typeof youtubeVideoList !== 'undefined' && typeof youtubeVideoList.rows !== 'undefined'){
                for(let entityKey in youtubeVideoList.rows) {
                    if(!youtubeVideoList.rows.hasOwnProperty(entityKey)) continue;
                    const videoEntity = youtubeVideoList.rows[entityKey];
                    if (videoEntity.value === item.id) video.customTitle = videoEntity.name;
                }
            }
            if(typeof self.additionalData[item.id] !== 'undefined' && typeof self.additionalData[item.id].title === 'string') {
                video.customTitle = self.additionalData[item.id].title;
            }
            return video;
        },
        formatDuration: function(duration){
            if(typeof duration !== 'string' || !duration.length) return null;
            return duration.replace(/PT(\d+)M(\d+)S/, function(match, minutes, seconds){
                return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds;
            })
        },
        formatViewCount: function(viewCount){
            if(typeof viewCount !== 'string' || !viewCount.length) return null;

            let viewCountFormatted = '';
            viewCount.split('').forEach(function(item, i){
                if(i % 3 === viewCount.length % 3 && i !== 0){
                    viewCountFormatted += ' ';
                }
                viewCountFormatted += item;
            });
            return viewCountFormatted;
        },
        getThumb: function(data){
            const self = this;
            const defaultData = {
                id: null,
                title: '',
                customTitle: '',
                duration: '',
                views: '',
                image: {
                    small: '',
                    large: ''
                },
                type: 'default' // default, related
            };
            data = $.extend({}, defaultData, data);

            return '<div class="view-demo__thumb view-demo__thumb--' + data.type + '" data-video-id="' + data.id + '">' +
            '<div class="view-demo__thumb-img-wrap">' +
            '<div class="view-demo__thumb-img" style="background-image: url(' + (data.type === 'default' ? data.image.small : data.image.large) + ')"></div>' +
            '<div class="view-demo__thumb-duration">' + data.duration + '</div>' +
            '<div class="view-demo__thumb-icon">' +
            '<svg viewBox="0 0 56.4 56.4"><use xlink:href="#play"></use></svg>' +
            '</div>' +
            '<div class="view-demo__thumb-play">' +
            '<div class="view-demo__thumb-stick"></div>' +
            '<div class="view-demo__thumb-stick"></div>' +
            '<div class="view-demo__thumb-stick"></div>' +
            '<div class="view-demo__thumb-stick"></div>' +
            '<div class="view-demo__thumb-stick"></div>' +
            '</div>' +
            '</div>' +
            '<div class="view-demo__thumb-content">' +
            '<div class="view-demo__thumb-title">' + (data.customTitle || data.title) + '</div>' +
            '<div class="view-demo__thumb-views">' + data.views + ' views</div>' +
            '</div>' +
            '</div>';
        },
        setPlayer: function(videoId) {
            const self = this;
            const videoElementId = 'view-demo-video-' + new Date().getTime();
            $('.' + self.classes.video).attr('id', videoElementId);
            self.player = new YT.Player(videoElementId, {
                height: '100%',
                width: '100%',
                playerVars: {
                    'theme': 'light',
                    'rel': 0,
                    'showsearch': 0,
                    'showinfo': 0,
                    'autoplay': 0,
                    'html5': 1,
                    'wmode': 'transparent',
                    'origin': 'http://www.ringcentral.com',
                    'enablejsapi': 1
                },
                videoId: videoId,
                events: {
                    'onStateChange': function(event){
                        self.onPlayerStateChange(event);
                    }
                }
            });
        },
        onPlayerStateChange: function(event) {
            const self = this;
            switch (event.data){
                case YT.PlayerState.PLAYING:
                    self.setVideoThumbPlayingClass();
                    self.trackPlay();
                    break;
                case YT.PlayerState.ENDED:
                    self.trackStop();
                    self.unsetVideoThumbPlayingClass();
                    break;
                case YT.PlayerState.PAUSED:
                    self.unsetVideoThumbPlayingClass();
                    break;
            }
            self.playing = (event.data === 1);

        },
        videoTrackingList: {},
        trackInit: function (videoId, videoTitle) {
            const self = this;
            if ( typeof ((window.dataLayer || {}).eventer || {} ).videoTrackingWrapper === "undefined") return;
            self.videoTrackingList[videoId] = {
                video: new window.dataLayer.eventer.videoTrackingWrapper({
                    name: videoTitle,
                    url: videoId,
                    section: 'Demo'
                }),
                trackedOnPlay: false
            }
        },
        trackPlay: function () {
            const self = this;
            const trackingEntity = self.videoTrackingList[self.activeVideo.id];
            if (typeof trackingEntity === 'undefined') return;
            if (!trackingEntity.trackedOnPlay) {
                trackingEntity.video.trackPlay();
                trackingEntity.trackedOnPlay = true;
            }
        },
        trackStop: function () {
            const self = this;
            const trackingEntity = self.videoTrackingList[self.activeVideo.id];
            if (typeof trackingEntity === 'undefined') return;
            const duration = self.player.getDuration();
            const currentTime = self.player.getCurrentTime();
            trackingEntity.video.trackStop(duration, currentTime);
            trackingEntity.trackedOnPlay = false;
        }
    };

    viewDemo.init();
})();