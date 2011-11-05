/*
 * test for haxe
 */
import Math;
class ShuffleBag{
    var data:Array<Int>;
    var cursor:Int;
    //c'tor
    public function new(){
        data=[];
        cursor=-1;

        //pointless preprocessor tests :)
        #if neko //nya :3
            trace("neko");
        #else flash9//no space
            trace("flash9");
        #end //foo
        
        #if flash8
            trace("flash8");
        #end//no space
    }
    //add one or several item(s)
    public function add(item:Int,?quantity:Int){
        if(quantity==null){
            data.push(item);
        }else{
            for(i in 0...quantity)
                data.push(item);
        }
        cursor=data.length - 1;
    }
    //returns the next item in the bag
    public function next(){
        if(cursor<1){
            cursor=data.length - 1;
            return data[0];
        }
        var grab:Int=Math.floor(Math.random()*(cursor + 1));
        var temp:Int=data[grab];
        data[grab]=data[cursor];
        data[cursor]=temp;
        cursor--;
        return temp;
    }
}