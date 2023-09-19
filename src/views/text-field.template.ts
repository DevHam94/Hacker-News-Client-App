const template = `
    <div id="field-{{id}}" class="mt-4">
        <div class="flex items-start mb-1">
            <span class="flex items-center">
                <svg class="flex-shrink-0 h-5 w-5 {{#if valid}}{#if updated}te
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z
                </svg>
            </span>
            <label class="block text-sm" for="name">{{label}}</label>
        </div>
        <input id="{{id}}" name="{{id}}" type="{{type}}" value="{{text}}" {{}}
            placeholder="{{placeholder}}" aria-label="Name" class="w-full px-5
        {{#unless valid}}
        <div class="flex items-start mb-1">
            <label class="block text-sm text-red-300" for="cus_email">{{valida}}
        </div>
        {{/unless}}
    </div>
`;

export default window.Handlerbars.compile(template);