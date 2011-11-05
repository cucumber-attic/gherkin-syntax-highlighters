// Example Scala file for source-highlight.

case class Point(x: Double, y: Double)  

abstract case class Shape { def draw(): Unit = println(this) }  
case class Circle(center: Point, radius: Double) extends Shape  
case class Rectangle(lowerLeft: Point, height: Double, width: Double) extends Shape

import scala.actors._  
import scala.actors.Actor._  

object ShapeDrawer extends Actor {  
    def act() {  
        loop {   
            receive {  
                case s: Shape => s.draw()  
                case "exit"   => { println("exiting..."); exit }  
                case x: Any   => println("Error: Unknown message! " + x)
            }
        }
    }
}

ShapeDrawer.start() 
ShapeDrawer ! Circle(Point(0.0,0.0), 1.0)     
ShapeDrawer ! Rectangle(Point(0.0,0.0), 2, 5) 
ShapeDrawer ! 3.14159  
ShapeDrawer ! "exit"   

// Output:
// => Circle(Point(0.0,0.0),1.0)
// => Rectangle(Point(0.0,0.0),2.0,5.0)
// => Error: Unknown message! 3.14159
// => exiting...
