function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function getType(src){src=src.replace('f.png','').replace('.png','');return src[src.length-1];}
function getPol(src){src=src.replace('f.png','').replace('.png','');if(src[0]=='s'){return 0;}
if(src[0]=='h'){return 1;}
return 2;}
function child(data1,data2,min,max,rnd){return Math.max(min,Math.min(max,~~((data1+data2)/2)+rand(-rnd,rnd)));}
function grass(){$("body").append('<img src="f.png" id="now">');$("#now").css({top:rand(20,height),left:rand(20,width)}).removeAttr('id');}
var maxChildren=8;var count_types=3;var delta=29;var startCount=5;var types0=['Транзакционистам','Системолаповцам','Одномеровцам'];var types1=['транзакционистов','лаповцев','одномеровцев'];var names_f=['Жёлудешёрстка','Мия','Гадюка','Ольхогривая','Янтарница','Яблочница','Зола','Пеплогривка','Алла','Альбина','Амелия','Анастасия','Ангелина','Анжелика','Анна','Анфиса','Арина','Валентина','Валерия','Варвара','Василиса','Венера','Вера','Вероника','Виктория','Виолетта','Виталина','Владислава','Галина','Гера','Дана','Дарина','Дарья','Диана','Динара','Евангелина','Екатерина','Елена','Елизавета','Есения','Жанна','Зарина','Злата','Зоя','Илона','Инесса','Иоанна','Ирина','Камилла','Карина','Каролина','Кира','Кристина','Ксения','Лариса','Лиана','Лидия','Лилия','Лия','Любовь','Людмила','Маргарита','Марианна','Марина','Мария','Марта','Милана','Мирослава','Надежда','Наталья','Ника','Нина','Оксана','Олеся','Ольга','Полина','Римма','Сабина','Светлана','Серафима','Снежана','Соня','Софья','Таисия','Тамара','Татьяна','Ульяна','Фатима','Эвелина','Элеонора','Элина','Эльвира','Эмма','Юлиана','Юлия','Яна','Ясмина'];var names_m=['Авангард','Августин','Авенир','Адам','Адольф','Адонис','Алевтин','Александр','Алексей','Альберт','Альфред','Анатолий','Андрей','Анисий','Антон','Антонин','Аполлинарий','Аркадий','Арнольд','Арсений','Артемий','Артур','Афанасий','Бенедикт','Богдан','Болеслав','Борис','Бронислав','Булат','Вадим','Валентин','Валерий','Василий','Вениамин','Виктор','Виссарион','Виталий','Вилен','Владислав','Владимир','Вальдемар','Всеволод','Вячеслав','Гавриил','Галактион','Геннадий','Георгий','Глеб','Григорий','Горимир','Давыд','Дамир','Даниил','Данис','Декабрий','Джозеф','Дмитрий','Донат','Евгений','Евдоким','Ефим','Захар','Иван','Игнат','Игорь','Казимир','Карл','Кирилл','Клавдий','Лавр','Лев','Леонард','Леонид','Любомир','Люциан','Май','Максим','Максимилиан','Мирослав','Милослав','Михаил','Моисей','Назар','Натан','Одиссей','Олег','Оскар','Октябрин','Павел','Пётр','Радислав','Радимир','Савелий','Святослав','Семён','Сергей','Станислав','Степан','Стефан','Тарас','Тристан','Трофим','Фёдор','Филлип','Флорентий','Харитон','Христофор','Эдуард','Эрнест','Юлиан','Юпитер','Юлий','Юрий','Яков','Ян','Яромир','Ярослав'];var isFight=new Array(count_types);for(var i=0;i<count_types;i++){isFight[i]=false;}
var microbes={};var population=0;maxChildren--;var begin=new Date;var width,height,ratio;function Microbe(pol,type,info){info=info||{};this.speed=info.speed||rand(150,500);this.fertility=info.fertility||rand(2,maxChildren);this.force=info.force||rand(100,900);this.endurance=info.endurance||rand(100,900);this.max_health=this.health=info.health||rand(10,100);this.mind=info.mind||rand(1,4);this.cure=info.cure||(rand(0,5)?0:rand(200,900));if(this.mind==1&&this.cure>0){this.mind=2;}
this.last=0;this.state=0;var first=false;if(pol===undefined){pol=rand(0,1)==0?'s':'';}else{first=true;pol=pol?'s':'';}
this.pol=pol?0:1;if(type===undefined){type=rand(1,count_types);}
this.num=(this.cure+this.mind+this.health+this.speed+this.force+rand(1,100000)+type+this.fertility)^rand(1,100000);this.num=this.num.toString(36);if(pol=='s'){this.name=names_f[rand(0,names_f.length-1)];}else{this.name=names_m[rand(0,names_m.length-1)];}
$("body").append('<img src="'+pol+'he'+type+'.png" id="now" data-num="'+this.num+'">');this.jquery=$("#now");this.x=info.x||rand(1,width);this.y=info.y||rand(1,height);$("#now").css({top:this.y,left:this.x,width:15,height:15}).removeAttr('id');if(first){this.jquery.width(52).height(52);}
microbes[this.num]=this;this.with=0;this.hunger=0;this.flower=false;var temp_this=this;this.jquery.draggable({stop:function(e,ui){if(temp_this.state==5){temp_this.x=ui.position.left;temp_this.y=ui.position.top;temp_this.state=0;}},drag:function(){if(!temp_this.state){temp_this.state=5;}}});this.death=function(){if(this.state>0&&this.with!==0){this.with.state=this.with.with=0;}
this.jquery.remove();delete microbes[this.num];};this.go=function(){var $this=this.jquery;var top=this.y;var left=this.x;var rnd=rand(2,10);if(rnd%2==1){rnd++;}
var pol=getPol($this.attr('src'));var type=getType($this.attr('src'));if(this.mind==1){if(rand(1,100)==5){if(rand(0,1)){left++;}else{top++;}}}else{if(!this.flower&&this.mind>=3){$("img[src='f.png']").each(function(){var left2=parseInt($(this).css('left'));var top2=parseInt($(this).css('top'));if(Math.abs(top2-top)<150&&Math.abs(left2-left)<150){if(left<left2&&left%2!=0){left++;}else if(left>left2&&left%2==0){left--;}
if(top<top2&&top%2!=0){top++;}else if(top>top2&&top%2==0){top--;}}});}
var area=(this.mind==2?100:150);for(var i in microbes){var two=microbes[i];var $this2=two.jquery;var pol2=getPol($this2.attr('src'));if(pol2==2||this.num==two.num||two.state>0){continue;}
var top2=two.y;var left2=two.x;if(Math.abs(top2-top)>area||Math.abs(left2-left)>area){continue;}
var type2=getType($this2.attr('src'));if((type==type2&&pol!=pol2)||(type!=type2&&this.health>two.health)){if(left<left2&&left%2!=0){left++;}else if(left>left2&&left%2==0){left--;}
if(top<top2&&top%2!=0){top++;}else if(top>top2&&top%2==0){top--;}}else if(type!=type2&&this.health<two.health){if(left<left2&&left%2==0){left--;}else if(left>left2&&left%2!=0){left++;}
if(top<top2&&top%2==0){top--;}else if(top>top2&&top%2!=0){top++;}}}}
if(top>=height&&top%2==0){top--;}else if(top<=1&&top%2!=0){top++;}
if(left>=width&&left%2==0){left--;}else if(left<=1&&left%2!=0){left++;}
var w=$this.width();var h=$this.height();if(~~(height/200)*100!=Math.round(top/100)*100){var check=false;for(var i=1;i<count_types;i++){if(Math.abs(left-ratio*i)<w+10){check=true;break;}}
if(check){left--;rnd*=2;}}
if(left%2==0){left+=rnd;}else{left-=rnd;}
if(top%2==0){top+=rnd;}else{top-=rnd;}
$this.css('top',top);$this.css('left',left);this.x=left;this.y=top;if(rand(0,50)==7&&w<75){$this.width(++w);}else if(rand(0,50)==7&&h<75){$this.height(++h);}
if(!this.flower){var temp_this=this;$("img[src='f.png']").each(function(){if(temp_this.flower)return;var flowerX=parseInt($(this).css('left'));var flowerY=parseInt($(this).css('top'));if(Math.abs(flowerY-top)<delta&&Math.abs(flowerX-left)<delta){$(this).remove();if(temp_this.hunger<=10){$this.attr('src',$this.attr('src').replace('.png','f.png'));temp_this.flower=true;}else{temp_this.hunger=Math.max(0,temp_this.hunger-5);}}});}
if(pol!=2){for(var i in microbes){var two=microbes[i];var $this2=two.jquery;var pol2=getPol($this2.attr('src'));if(pol2==2||this.num==two.num||two.state>0){continue;}
var top2=two.y;var left2=two.x;var type2=getType($this2.attr('src'));if(Math.abs(top2-top)<delta&&Math.abs(left2-left)<delta){if(type!=type2){this.with=two;two.with=this;this.state=two.state=1;this.y=two.y;this.x=(two.x>100?two.x-20:two.x+20);$this.css('top',this.y).css('left',this.x);}else if(this.health<this.max_health&&two.cure>0){this.state=3;two.state=2;this.with=two;two.with=this;this.y=two.y;this.x=(two.x>100?two.x-20:two.x+20);$this.css('top',this.y).css('left',this.x);}else if(pol!=pol2&&w+h>40&&$this2.width()+$this2.height()>40){$this.attr('src','it'+getType($this.attr('src'))+(this.flower?'f':'')+'.png');$this2.attr('src','it'+getType($this2.attr('src'))+(two.flower?'f':'')+'.png');this.mind=two.mind=1;var randChildren=~~((this.fertility+two.fertility)/2)+rand(-1,1);if(population>70){randChildren=1;}else if(population>90){randChildren=0;}
for(var i=0;i<randChildren;i++){var info={speed:child(this.speed,two.speed,150,500,75),fertility:child(this.fertility,two.fertility,2,maxChildren,1),force:child(this.force,two.force,100,900,75),endurance:child(this.endurance,two.endurance,100,900,75),health:child(this.health,two.health,10,100,10),mind:child(this.mind,two.mind,1,4,1),x:child(this.x,two.x,20,width,30),y:child(this.y,two.y,20,height,30)};if(((this.cure>0||two.cure>0)&&rand(0,1)==0)||rand(0,7)==7){info.cure=child(this.cure||1000,two.cure||1000,200,900,75);}
new Microbe(undefined,type,info);}}else if(isFight[type]){this.with=two;two.with=this;this.state=two.state=1;this.y=two.y;this.x=(two.x>100?two.x-20:two.x+20);$this.css('top',this.y).css('left',this.x);}else if(this.mind==4&&two.mind==4&&this.cure==0&&two.cure>0){this.state=4;two.state=4;this.cure=rand(200,900);this.with=two;two.with=this;this.y=two.y;this.x=(two.x>100?two.x-20:two.x+20);$this.css('top',this.y).css('left',this.x);}}}}else if(rand(1,100)==6){this.death();}};this.fight=function(){var two=this.with;two.health--;if(two.health<1){if(two.flower){this.jquery.attr('src',this.jquery.attr('src').replace('.png','f.png'));this.flower=true;}
two.death();this.state=this.with=0;}else{this.x--;if(this.x%2==0){this.x+=2;}else{this.x-=2;}
this.jquery.css('left',this.x);}};this.heal=function(){var two=this.with;var $this=this.jquery;two.health++;if(two.health>=two.max_health){two.health=two.max_health;this.state=this.with=two.state=two.with=0;}else{this.x--;if(this.x%2==0){this.x+=2;}else{this.x-=2;}
this.jquery.css('left',this.x);}};this.learn=function(){this.state=this.with.state=0;};this.update=function(){var ms=0;switch(this.state){case 0:ms=this.speed;break;case 1:ms=this.force;break;case 2:ms=~~((this.cure+this.with.endurance)/2);break;case 4:ms=5000;break;}
if(ms!=0&&new Date()-this.last>ms){this.jquery.css('top',this.y);this.jquery.css('left',this.x);this.last=+(new Date());if(rand(1,7)==7){this.hunger++;if(this.flower&&this.hunger>10){this.jquery.attr('src',this.jquery.attr('src').replace('f',''));this.flower=false;this.hunger-=5;}
if(this.hunger>=100){this.death();}else if(this.hunger>90){this.speed=rand(1000,2000);}}
switch(this.state){case 0:this.go();break;case 1:this.fight();break;case 2:this.heal();break;case 4:this.learn();break;}}};}
$(function(){$("body").on('dblclick','img[class]',function(){var m=microbes[$(this).data('num')];var newName=prompt('Введите имя микроба:',m.name);if(newName!=null){m.name=newName;}});$("body").tooltip({items:"img[class]",track:true,content:function(){var m=microbes[$(this).data('num')];if(!m||m.pol===undefined){return;}
var speed,mind,fertility,hunger;var oj=(m.pol?'ой':'ая'),ij=(m.pol?'ый':'ая'),en=(m.pol?'ен':'на'),sa=(m.pol?'ся':'ась');if(m.speed<250){speed='Скоростн'+oj;}else if(m.speed<300){speed='Быстр'+ij;}else if(m.speed<450){speed='Медленн'+ij;}else{speed='Как улитка';}
if(m.mind==1){mind='Глуп'+ij;}else if(m.mind==2){mind='Обученн'+ij;}else if(m.mind==3){mind='Умн'+ij;}else{mind='Гениальн'+ij;}
if(m.fertility<=3){fertility='Неплодовит'+ij;}else if(m.fertility<=6){fertility='Плодовит'+ij;}else{fertility='Очень плодовит'+ij;}
if(m.hunger<10){hunger='Не голод'+en;}else if(m.hunger<40){hunger='Проголодал'+sa;}else if(m.hunger<70){hunger='Голод'+en;}else if(m.hunger<90){hunger='Смертельно голод'+en;}else{hunger='Умирает';}
var title=m.name+'<br>'+m.health+'/'+m.max_health+'<br>'+speed+'<br>'+mind+'<br>'+fertility+
(m.cure>0?'<br>Умеет лечить':'')+'<br>'+hunger;return title;}});width=$(document).width()-50;height=$(document).height()-50;ratio=width/count_types;for(var a=1;a<count_types;a++){for(var i=0;i<height;i+=50){if(~~(height/200)*100==i){continue;}
$("body").append('<img src="stone.png" id="now">');$("#now").css({top:i,left:ratio*a}).removeAttr('id');}}
for(var type=1;type<=count_types;type++){for(var i=0;i<startCount;i++){new Microbe(i<startCount/2,type,{x:rand(ratio*(type-1)+20,ratio*type-52)});}}
for(var i=0;i<15;i++){grass();}
setTimeout(function main(){for(var i in microbes){microbes[i].update();}
var checkType=getType(microbes[i].jquery.attr('src'));var check=true;var count=[];for(var i=1;i<=count_types;i++){count[i]=0;}
for(var i in microbes){var nowType=getType(microbes[i].jquery.attr('src'));if(nowType!=checkType){check=false;}
count[nowType]++;}
population=$("img[class]").length;for(var i=1;i<count_types;i++){if(count[i]>15){isFight[i]=true;}else{isFight[i]=false;}}
if(check){var end=new Date;var seconds=~~((end-begin)/1000);var enemy='';for(var i=1;i<=count_types;i++){if(i!=checkType){enemy+=types1[i-1];if(i==count_types||(i+1==count_types&&i+1==checkType)){enemy+='.';}else if(i+1==count_types||(i+2==count_types&&(i+1==checkType||i+2==checkType))){enemy+=' и ';}else{enemy+=', ';}}}
var dekl='';var digit=seconds.toString().split('').reverse().join('').charAt(0);if(digit==1){dekl='а';}else if(digit>=2&&digit<=4){dekl='ы';}
if(seconds>10&&seconds<20){dekl='';}
$("body").html(types0[checkType-1]+' понадобилось '+seconds+' секунд'+dekl+', чтобы победить своих врагов — '+enemy);}else{if(rand(0,50)==7){grass();}
setTimeout(main,50);}},50);});
