﻿define(['modules/lessProcessor'], function (lessProcessor) {
    ko.bindingHandlers.mediaPlayer = {
        init: function (element, valueAccessor) {

            var
                $element = $(element),
                args = valueAccessor(),
                embedCode = ko.utils.unwrapObservable(args.embedCode);

            $element.html(getMediaEmbedCode());

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $iframe = $element.find('iframe');
                if ($iframe.length) {
                    $iframe.attr('src', 'about:blank');
                }
                $element.empty();
            });

            function getMediaEmbedCode() {

                if (!embedCode)
                    return embedCode;

                var srcAttrName = 'src',
                    $container = $('<div/>').html(embedCode),
                    $iframe = $container.find('iframe'),
                    src = $iframe.attr(srcAttrName),
                    variablesList = getVariablesList();

                src += '&style_variables=' + encodeURIComponent(variablesList);

                $iframe.attr(srcAttrName, src);
                return $container.html();
            }
        }
    };

    function getVariablesList() {
        return lessProcessor.vars ? JSON.stringify({ '@main-color': lessProcessor.vars['@main-color'], '@content-body-color': lessProcessor.vars['@content-body-color'], '@text-color': lessProcessor.vars['@text-color'] }) : undefined;
    }
})