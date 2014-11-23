(function(selector){
    try{
      var cBox = function( selector ) {
        if( !( this instanceof cBox)) return new cBox( selector );
        this.all = [];
        this.lastClicked = null;
        if( selector ) {
          this.init(selector);
          return this;
        }
        throw new TypeError('Please pass in a selector or class to cBox');
      };

      cBox.prototype.init = function( selector ){
        if(! this.all.length) {
          var nodes = document.querySelectorAll( selector );
          if( ! nodes || ! nodes.length ) throw new Error( 'Selector has not been found on the page' );
          if( this.all.length !== nodes.length) {
            for( var i=0, l=nodes.length; i<l; i++ ){
              this.all.push(nodes[i]);
              nodes[i].addEventListener('click', this.activate.bind(this, nodes[i]), false);
            }
          }
        }
      };

      cBox.prototype.activate = function(node, e) {
        var start, finish;
        if( this.all.indexOf(node) > this.all.indexOf(this.lastClicked)) {
          start = this.all.indexOf(this.lastClicked);
          finish = this.all.indexOf(node);
        }
        else {
          start = this.all.indexOf(node);
          finish = this.all.indexOf(this.lastClicked) + 1;
        }

        if(e.shiftKey) {
          this.set( this.all.slice(start, finish), node.checked );
        }
        this.lastClicked = node; 
      };

      cBox.prototype.set = function( indexes, bool ) {
        if( ! indexes.length ) return false;
        indexes.forEach(function(d){
          d.checked = bool;
        })
      };
      cBox(selector);
    }
    catch(e){ console.log( e.message );}
  }('.myClass'));
