window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var button = document.getElementById('button');
  //ボタンクリック時の処理
  button.addEventListener('click', function () {
    //入力欄からアイテム名を取得
    var input = document.getElementById('keyword'),
        keyword = input.value,
        xhr = new XMLHttpRequest(),
        url = 'http://api.fukuro.coop.moe/recipes?query=' + keyword,
        frag = document.createDocumentFragment();
    //知恵袋APIからアイテムを取得
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = xhr.response;
        //取得アイテムのリストアップ
        var list = document.getElementById('list');
        list.innerHTML = '';
        if (keyword) {
          for (var i = 0, len = data['レシピ一覧'].length; i < len; i++) {
            var item =data['レシピ一覧'][i]['レシピ名']
            var li = document.createElement('li');
            var text = document.createTextNode(item);
            li.appendChild(text);
            frag.appendChild(li);
          }
        }
        list.appendChild(frag);
      }
    };
    xhr.responseType = 'json';
    xhr.open('GET', url, true);
    xhr.send();
  });
});
