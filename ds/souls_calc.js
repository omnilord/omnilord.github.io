$(function () {
  var img_url_base = 'https://darksouls2.wiki.fextralife.com/file/Dark-Souls-2',
      souls = [
        {
          img: 'xsmall_soul.png',
          name: 'Fading Soul',
          xp: 50
        }, {
          img: 'xsmall_soul.png',
          name: 'Soul of a Lost Undead',
          xp: 200
        }, {
          img: 'xsmall_soul.png',
          name: 'Large Soul of a Lost Undead',
          xp: 400
        }, {
          img: 'small_soul.png',
          name: 'Soul of a Nameless Soldier',
          xp: 800
        }, {
          img: 'small_soul.png',
          name: 'Large Soul of a Nameless Soldier',
          xp: 1000
        }, {
          img: 'medium_soul.png',
          name: 'Soul of a Proud Knight',
          xp: 2000
        }, {
          img: 'medium_soul.png',
          name: 'Large Soul of a Proud Knight',
          xp: 3000
        }, {
          img: 'large_soul.png',
          name: 'Soul of a Brave Warrior',
          xp: 5000
        }, {
          img: 'large_soul.png',
          name: 'Large Soul of a Brave Warrior',
          xp: 8000
        }, {
          img: 'soul_great_hero.png',
          name: 'Soul of a Hero',
          xp: 10000
        }, {
          img: 'soul_great_hero.png',
          name: 'Soul of a Great Hero',
          xp: 20000
        }, {
          img: 'Soul%20of%20a%20Giant.png',
          name: 'Soul of a Giant',
          xp: 10000,
          note: "Will lower Vendrick's defense while in inventory"
        }
      ],
      $tbody = $('#souls_table');


  function calculate_line_xp() {
    var $this = $(this),
        $line = $this.next('small.line_total'),
        count = parseInt($this.val() || 0),
        xp = count * parseInt($this.data('xp'));

    $line.text(`${xp} XP`);

    return xp;
  }

  function xp_reducer(total, soul_input) {
    var line_total = calculate_line_xp.apply(soul_input);

    return total + line_total;
  }

  function calculate_total_xp() {
    var total = $('input.xp_input').get().reduce(xp_reducer, 0);

    $('#total_xp').text(`${total}`);
  }


  souls.forEach((soul) => {
    var cells = [
      $('<td style="vertical-align: middle"></td>').html(`<img style="width: 60px;" title="${soul['name']}" src="${img_url_base}/${soul['img']}" alt="${soul['name']}">`),
      $('<td style="vertical-align: middle"></td>').text(soul['name']),
      $('<td style="vertical-align: middle"></td>').text(soul['xp']),
      $('<td style="vertical-align: middle"></td>').append([
        $('<input type="number" class="xp_input" min="0" max="999" placeholder="#" />')
          .data('xp', soul['xp'])
          .on('blur', calculate_total_xp),
        $('<br/>'),
        $('<small class="line_total"></small>')
      ])
    ];

    if (soul.hasOwnProperty('note')) {
      cells.push($('<td style="margin-top:auto; margin-bottom:auto;"></td>').text(soul['note']));
    }

    $tbody.append($('<tr></tr>').append(cells));
  });

  $tbody.append($('<tr></tr>').append([
    $('<td colspan="2" style="text-align: right">Total XP:</td>'),
    $('<td id="total_xp">0</td>'),
    $('<td></td>').append([
      $('<button type="button" id="calc_xp">Calc</button>')
        .on('click', calculate_total_xp)
    ])
  ]));
});
