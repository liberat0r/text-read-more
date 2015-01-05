Text Read More
==============

JQuery plugin for animating read more/close for text boxes.

__Classes__
- .js-text-read defines the text content (needs to have overflow hidden)
- .js-button-read defines the button that is used to read more or close
- .js-text-lessed add this class to the button and the text in order to start with the text closed

__Attributes__
- [data-limit-height] Set the limited height of the box

__Example__
([jsfiddle](http://jsfiddle.net/liberat0r/zb7zs5om/1/))
```
<article class="text-box">
  <div style="overflow: hidden;" class="text-box__content js-text-read js-text-lessed" data-limit-height="150">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue nunc lacus, nec maximus diam dapibus vel. 
    Sed eget arcu porttitor, aliquam lacus at, viverra metus. Quisque ut arcu in metus mollis dictum sed eu ex.
  </div>
  
  <button type="button" class="text-box__button js-button-read js-text-lessed">
    Read more / Close
  </button>
</article>
```
