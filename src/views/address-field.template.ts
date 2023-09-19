const template = `
<div id="field-{{id}}">

    <div class="mt-2">
        <label class="block text-sm" for="cus_email">{{label}}</label>
        <div class="flex items-center">
            <input id="address1" name ="address1" type="text" value="{{displayA
            <button id="search-address" class="bg-gray-300 text-gray-500 px-1 
                <svg fill="none" stroke="cuurentColor" stroke-linecap="round" st
            </button>
        </div>
    </div>

    <div class="mt-2">
        <label class="hidden text-sm block text-gray-600" for="address2">상세
        <input id="address2" name="address2" type="text" placeholder="상세 주소
    </div>

</div>
`;

export default window.Handlerbars.compile(template);