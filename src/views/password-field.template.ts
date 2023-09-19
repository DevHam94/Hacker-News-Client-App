const template= `
<div id="field-{{id}}">
    <div class="mt-4">
        <div class="flex items-start mb-1">
            <span class="flex items-center">
                <svg class="flex-shrink-0 h-5 w-5 {{#if valid}}{{#if updated}}te
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z
                </svg>
            </span>
            <label id="{{id}}" name="{{id}}" type="password" value="{{text}}" pl
            </div>

            <div class="mt-1">
            <div class="flex items-start mb-1">
                {{#if strongLevel0}}
                <span class="flex items-center">
                    <svg class="flex-shrink-0 h-5 w-5 text-green-100" viewBox=0 0 2
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z
                    </svg>
                </span>
                {{/if}}

                {{#if strongLevel1}}
                <span class="flex items-center">
                    <svg class="flex-shrink-0 h-5 w-5 text-green-400" viewBox="0 0 2
                        <path fill-rule-"evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z
                    </svg>
                    
`;